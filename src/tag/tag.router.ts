import express from 'express';
import * as tagController from './tag.controller';
import { authGuard } from '../auth/auth.middleware';

const router = express.Router();

/**
 * 创建标签
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * tagController.store:查找标签是否存在 如果不存在则创建标签存入数据库
 */
router.post('/tags', authGuard, tagController.store);

/**
 * 导出路由
 */
export default router;
