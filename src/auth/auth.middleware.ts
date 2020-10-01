import { Request, Response, NextFunction, request } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import * as userService from '../user/user.service';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';

/**
 * 验证用户登录数据
 */
export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮‍♀️ 验证用户登录数据');

  //准备数据
  const { name, password } = request.body;

  //验证必填数据
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  //通过用户名查询数据库内的用户名和密码
  const user = await userService.getUserByName(name, { password: true });
  //另一种写法的调用   const user = await userService.getUserByName(name, true);
  if (!user) return next(new Error('USER_DOES_NOT_EXIST'));

  //验证用户密码:把用户输入的密码与刚查到的数据库储存的密码比对
  const matched = await bcryptjs.compare(password, user.password);
  if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));

  //在请求主体里添加用户
  request.body.user = user;

  //下一步
  next();
};

/**
 * 验证用户身份
 */
export const authGuard = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮 验证用户身份');

  try {
    // 提取 Authorization
    const authorization = request.header('Authorization');
    if (!authorization) throw new Error();

    //提取 JWT 令牌
    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    //验证令牌
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    //在请求里添加当前用户
    request.user = decoded as TokenPayload;

    //下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};

/**
 * 访问控制
 */
interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    console.log('👮 访问控制');

    //解构选项
    const { possession } = options;

    //当前用户 ID
    const { id: userId } = request.user;

    // 放行管理员
    if (userId == 1) return next();

    // 准备资源
    const resourceIdParam = Object.keys(request.params)[0]; //获取资源id参数:postId
    const resourceType = resourceIdParam.replace('Id', ''); //获取资源类型:post
    const resourceId = parseInt(request.params[resourceIdParam], 10); //获取资源id:xx

    // 检查资源拥有权
    if (possession) {
      try {
        const ownResource = await possess({ resourceId, resourceType, userId });

        if (!ownResource) {
          return next(new Error('USER_DOES_NOT_OWN_RESOURCE'));
        }
      } catch (error) {
        return next(error);
      }
    }

    next();
  };
};
