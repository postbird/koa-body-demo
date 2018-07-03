/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
const path = require('path');
const fs = require('fs');

function checkDirExist(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}

module.exports = checkDirExist;