import { Request, Response, NextFunction } from 'express';

/**
 * 评论列表过滤器
 */
export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 默认的过滤
  request.filter = {
    name: 'default',
    sql: 'comment.parentId IS NUll',
  };

  // 下一步
  next();
};
