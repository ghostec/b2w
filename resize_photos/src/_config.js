const test = {
  host: 'http://localhost:8080',
  images_dir: 'images',
  database: 'mongodb://localhost:27017/resize_photos_test'
};

const dev = {
  host: 'http://localhost:8080',
  images_dir: 'images',
  database: 'mongodb://localhost:27017/resize_photos'
};

module.exports = { test, dev }[process.env.NODE_ENV];
