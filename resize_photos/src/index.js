require('es6-promise').polyfill();
require('isomorphic-fetch');
require('app-module-path').addPath(__dirname);
const { images_dir } = require('_config');
const fs = require('fs');

if(!fs.existsSync(images_dir)) fs.mkdirSync(images_dir);

const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
