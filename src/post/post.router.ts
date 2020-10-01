import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { authGuard, accessControl } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 内容列表
 */
router.get('/posts', requestUrl, postController.index);

/**
 * 创建内容
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * postController.store:把客户端传来的要创建的内容与用户信息存放到设计好的数据库中
 */
router.post('/posts', authGuard, postController.store);

/**
 * 更新内容
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * accessControl:查询postId(要修改内容的id)与当前登陆中的令牌中的用户信息在数据库键值对关系是否匹配
 * postController.update:更新内容
 */
router.patch(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.update,
);

/**
 * 删除内容
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * accessControl:查询postId(要修改内容的id)与当前登陆中的令牌中的用户信息在数据库键值对关系是否匹配
 * postController.update:更新内容
 */
router.delete(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.destroy,
);

/**
 * 导出路由
 */
export default router;
