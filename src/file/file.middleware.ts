import multer from 'multer';

/**
 * 创建一个 Multer
 */
const fileUpload = multer({
  dest: 'uploads/', //上传文件存储的位置
});

/**
 * 文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');
