import express from 'express';
import * as postController from './post.controller';
import { requestUrl } from '../app/app.middleware';
import { read } from 'fs';

const router = express.Router();

/**
 * 内容列表
 */
router.get('/posts', requestUrl, postController.index);

router.post('/posts', function(req, res) {
  res.send(req.body);
});

/**
 * 导出路由
 */
export default router;
