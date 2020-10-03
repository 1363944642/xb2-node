import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import { fileInterceptor, fileProcessor } from './file.middleware';
import * as fileController from './file.controller';

const router = express.Router();

/**
 * 上传文件
 * authGuard:通过公钥验证客户端令牌,并得到令牌中的用户信息存放在请求处理参数中
 * fileInterceptor:Multer文件拦截器
 * fileController.store:获取文件信息和关联用户id与关联内容id并储存到数据库中
 */
router.post(
  '/files',
  authGuard,
  fileInterceptor,
  fileProcessor,
  fileController.store,
);

/**
 * 文件服务
 * fileController.serve:通过从地址参数里得到文件ID在数据库中查找到对应数据,通过response.sendFile返回给客户端
 */
router.get('/files/:fileId/serve', fileController.serve);

/**
 * 文件信息
 */
router.get('/files/:fileId/metadata', fileController.metadata);

/**
 * 导出路由
 */
export default router;
