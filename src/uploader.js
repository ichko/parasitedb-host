const fs = require('fs');
const sha256 = require('sha256');

const timestamp = () => +new Date();
const id = ((x = 0) => () => x++)();
const hash = sha256;

const getUploadName = () => hash(`${timestamp()}-${id()}`);
const getUploadLocation = (name, location) => `${location}/${name}`;

module.exports = {
  upload(data, location) {
    const fileName = getUploadName();
    const uploadLocation = getUploadLocation(fileName, location);

    return new Promise((resolve, reject) => {
      fs.writeFile(uploadLocation, new Buffer(data, 'binary'), error => {
        if (error) {
          reject(error);
        } else {
          resolve(fileName);
        }
      });
    });
  }
};
