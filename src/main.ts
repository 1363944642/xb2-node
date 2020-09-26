import app from './app';
import { APP_PORT } from './app/app.comfig';

app.listen(APP_PORT, () => {
  console.log('🚀 服务器已启动!');
});
