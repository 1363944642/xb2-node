import express from 'express';
import { accessControl, authGuard } from '../auth/auth.middleware';
import * as commentController from './comment.controller';
import { filter } from './comment.middleware';
import { paginate } from '../post/post.middleware';
import { COMMENTS_PER_PAGE } from '../app/app.config';

const router = express.Router();

/**
 * 发表评论
 * insertId:通过公钥验证客户端令牌,并得到令牌中的用户信息,存放在请求处理参数中.
 * commentController.store:准备数据,保存评论数据到数据库
 */
router.post('/comments', authGuard, commentController.store);

/**
 * 回复评论
 */
router.post('/comments/:commentId/reply', authGuard, commentController.reply);

/**
 * 修改评论
 * insertId:通过公钥验证客户端令牌,并得到令牌中的用户信息,存放在请求处理参数中.
 * accessControl({ possession: true }):验证用户是否拥有要修改的这个评论资源(就是这个评论是否是当前用户发表的)
 * commentController.update:准备数据,在数据库修改评论数据
 */
router.patch(
  '/comments/:commentId',
  authGuard,
  accessControl({ possession: true }),
  commentController.update,
);

/**
 * 删除评论
 * insertId:通过公钥验证客户端令牌,并得到令牌中的用户信息,存放在请求处理参数中.
 * accessControl({ possession: true }):验证用户是否拥有要删除的这个评论资源(就是这个评论是否是当前用户发表的)
 * commentController.update:准备数据,在数据库修改评论数据
 */
router.delete(
  '/comments/:commentId',
  authGuard,
  accessControl({ possession: true }),
  commentController.destroy,
);

/**
 * 评论列表
 */
router.get(
  '/comments',
  filter,
  paginate(COMMENTS_PER_PAGE),
  commentController.index,
);

/**
 * 导出路由
 */
export default router;
