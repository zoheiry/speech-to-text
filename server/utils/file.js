const fs = require('fs-extra');

const renameFile = (path, name) => {
  const newPath = path.indexOf('/') > -1
    ? path.split('/').slice(0, -1).join('/') + '/' + name
    : name;

  fs.renameSync(path, newPath);
  return newPath;
}

module.exports = { renameFile };
