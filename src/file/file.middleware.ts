import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.servive';

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

/**
 * 文件处理器
 */
export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 文件路径
  const { path } = request.file;

  let image: Jimp;

  try {
    //读取图像文件
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }

  //准备图像数据
  const { imageSize, tags } = image['_exif'];

  //在请求里添加文件数据
  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };

  //调整图像大小
  imageResizer(image, request.file);

  //下一步
  next();
};
