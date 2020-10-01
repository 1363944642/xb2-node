import app from './app';
import { APP_PORT } from './app/app.config';
import { connection } from './app/database/mysql';

app.listen(APP_PORT, () => {
  console.log('🚀  服务器已启动!');
});

/**
 * 测试使用数据库
 */
connection.connect(error => {
  if (error) {
    console.log('🐿 连接数据服务失败: ', error.message);
  }
  console.log('📚 成功连接数据服务 ~~');
});
