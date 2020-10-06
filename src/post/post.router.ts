import express from 'express';
import * as postController from './post.controller';
import { authGuard, accessControl } from '../auth/auth.middleware';
import { sort, filter, paginate } from './post.middleware';

const router = express.Router();

/**
 * 内容列表
 * sort:排序方式
 * filter:过滤列表
 */
router.get('/posts', sort, filter, paginate, postController.index);

/**
 * 创建内容
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * postController.store:把客户端传来的要创建的内容与用户信息存放到设计好的数据库中
 */
router.post('/posts', authGuard, postController.store);

/**
 * 更新内容
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * accessControl:查询postId(要修改内容的id)与当前登陆的令牌中的用户信息在数据库键值对关系是否匹配
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
 * accessControl:查询postId(要删除内容的id)与当前登陆的令牌中的用户信息在数据库键值对关系是否匹配
 * postController.update:更新内容
 */
router.delete(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.destroy,
);

/**
 * 添加内容标签
 * 参数: 1.:postId(内容id) 2.body:name(标签名)
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * accessControl:查询postId(要添加内容标签的内容id)与当前登陆的令牌中的用户信息在数据库键值对关系是否匹配
 * postController.storePostTag:判断标签是否存在,如果存在,则判断存在则验证内容与标签是否已经关联,如果没关联则关联起来(把内容id与标签id关联添加到post_tag数据表)
 *                                            如果标签不存在,则创建标签,然后关联起来(把内容id与标签id关联添加到post_tag数据表)
 */
router.post(
  '/posts/:postId/tag',
  authGuard,
  accessControl({ possession: true }),
  postController.storePostTag,
);

/**
 * 移除内容标签
 * 参数: 1.:postId(内容id) 2.body:tagId(标签Id)
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * accessControl:查询postId(要删除内容标签的内容id)与当前登陆的令牌中的用户信息在数据库键值对关系是否匹配
 * postController.destroyPostTag: 按照标签id与内容id删除post_tag数据表里的数据
 */
router.delete(
  '/posts/:postId/tag',
  authGuard,
  accessControl({ possession: true }),
  postController.destroyPostTag,
);

/**
 * 导出路由
 */
export default router;
