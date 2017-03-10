require('app-module-path').addPath(__dirname + '/../src');
process.env.NODE_ENV = 'test';
const { images_dir } = require('_config');

const fs = require('fs-extra');
const mongoose = require('mongoose');

const db = mongoose.connection;

beforeEach(done => {
  db.dropDatabase(done);
});

before(done => {
  db.once('open', () => {
    if(!fs.existsSync(images_dir)) fs.mkdirSync(images_dir);
    db.dropDatabase(() => done());
  });

  db.on('error', console.error.bind(console, 'Error:'));
});

after(done => {
  if(fs.existsSync(images_dir)) fs.removeSync(images_dir);
  db.dropDatabase(() => done());
});
