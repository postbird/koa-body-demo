const path = require('path');
const koa = require('koa');
const nunjucks = require('koa-nunjucks-2');
const koaBody = require('koa-body');
const router = require('./routes');

const getUploadFileExt = require('./utils/getUploadFileExt');
const getUploadFileName = require('./utils/getUploadFileName');
const checkDirExist = require('./utils/checkDirExist');
const getUploadDirName = require('./utils/getUploadDirName');

const app = new koa();

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, './views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

app.use(koaBody({
  multipart: true,
  encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload'),
    keepExtensions: true,
    maxFieldsSize: 2 * 1024 * 1024,
    onFileBegin: (name, file) => {
      // console.log(file);
      // 获取文件后缀
      const ext = getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName();
      const dir = path.join(__dirname, `public/upload/${dirName}`);
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir);
      // 获取文件名称
      const fileName = getUploadFileName(ext);
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `${dirName}/${fileName}`;
    },
  }
}));
app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
  console.log('[ok] Server starts at http://127.0.0.1:3000');
});