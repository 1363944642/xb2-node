import { Request, Response, NextFunction } from 'express';
import * as userService from '../user/user.service';
import bcryptjs from 'bcryptjs';

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

  //验证用户名
  const user = await userService.getUserByName(name, { password: true });
  //另一种写法的调用   const user = await userService.getUserByName(name, true);
  if (!user) return next(new Error('USER_DOES_NOT_EXIST'));

  //验证用户密码
  const matched = await bcryptjs.compare(password, user.password);
  if (!matched) return next(new Error('PASSWORD_DOES_NOT_MATCH'));

  //在请求主体里添加用户
  request.body.user = user;

  //下一步
  next();
};
