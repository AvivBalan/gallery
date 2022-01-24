'use strict';

const fs = require('fs-extra');
const path = require('path');

// if (!process.env.DATA_DIR) throw new Error('no DATA_DIR env is set');
const baseDir = path.join(process.env.DATA_DIR);
fs.ensureDirSync(baseDir);

function filePath(id) {
  id = id.toString();
  return path.join(baseDir, id);
}

function createWriteStream(id) {
  return fs.createWriteStream(filePath(id), {flags: 'w'});
}

function createReadStream(id) {
  return fs.createReadStream(filePath(id));
}

function deleteFile(id) {
  return fs.remove(filePath(id));
}

module.exports = {
  createWriteStream,
  createReadStream,
  deleteFile
};
