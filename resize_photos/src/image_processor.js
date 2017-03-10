const fs = require('fs');
const gm = require('gm').subClass({ imageMagick: true });
const http = require('http');
const request = require('request');
const { waterfall, map } = require('async');
const { images_dir } = require('_config');

var sizes = [
  { width: 320, height: 240, name: 'small' },
  { width: 384, height: 288, name: 'medium' },
  { width: 640, height: 480, name: 'large' }
];

const filename = url => url.split('/').pop().split('.')[0];

module.exports = url => {
  return Promise.all(sizes.map(size => {
    return new Promise((resolve, reject) => {
      gm(request(url))
      .resize(size.width, size.height)
      .setFormat('jpeg')
      .toBuffer((err, buffer) => {
        if(err) return reject(err);
        const filepath = `${images_dir}/${filename(url)}_${size.name}.jpg`;
        fs.writeFile(filepath, buffer, 'binary', err => {
          if(err) return reject(err);
          return resolve(filepath);
        }); 
      }); 
    });
  }));
}
