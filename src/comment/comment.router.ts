import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as commentController from './comment.controller';

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
 * 导出路由
 */
export default router;
