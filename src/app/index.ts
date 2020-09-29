import express from 'express';
import postRouter from '../post/post.router';
import userRouter from '../user/user.router';
import authRouter from '../outh/auth.router';
import { defaultErrorHandler } from './app.middleware';

/**
 * 创建应用
 */
const app = express();

/**
 * 处理JSON
 */
app.use(express.json());

/**
 * 路由
 */
app.use(postRouter, userRouter, authRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;
