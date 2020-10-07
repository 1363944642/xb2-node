import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/app.config';
import { connection } from '../app/database/mysql';

/**
 * 签发信息
 */
interface SignTokenOptions {
  payload?: any;
}

export const signToken = (options: SignTokenOptions) => {
  //准备选项
  const { payload } = options;
  //签发 JWT
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });

  //提供 JWT
  return token;
};

/**
 * 检查用户是否拥有指定资源
 */
interface PossessOptions {
  resourceId: number;
  resourceType: string;
  userId: number;
}

export const possess = async (options: PossessOptions) => {
  // 准备选项
  const { resourceId, resourceType, userId } = options;

  // 准备查询 统计列数
  const statement = `
    SELECT COUNT(${resourceType}.id) as count
    FROM ${resourceType}
    WHERE ${resourceType}.id = ? AND userId = ?
  `;

  // 检查拥有权
  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);

  // 提供检查结果
  //console.log(data); data返回值:[ TextRow { count: 0 } ]/[ TextRow { count: 1 } ]
  return data[0].count ? true : false;
};

/**
 * 检查用户是否拥有指定资源___上传文件
 */

export const possessFile = async (postId: string, userId: string) => {
  // 准备查询 统计列数
  const statement = `
    SELECT COUNT( ID ) as count
    FROM post
    WHERE Id = ? AND userId = ?;
  `;

  // 检查拥有权
  const [data] = await connection.promise().query(statement, [postId, userId]);

  // 提供检查结果
  //console.log(data); data返回值:[ TextRow { count: 0 } ]/[ TextRow { count: 1 } ]
  return data[0].count ? true : false;
};
