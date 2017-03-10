const express = require('express'),
  mongoose = require('mongoose'),
  fetchPayload = require('payload'),
  imageProcessor = require('image_processor'),
  { host, database, images_dir } = require('_config'),
  { waterfall } = require('async'),
  Image = require('image_model');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(database);

app.get('/', (req, res) => {
  waterfall([
    cb => Image.remove({}, err => cb()),
    cb => fetchPayload().then(urls => cb(null, urls)),
    (urls, cb) => {
      Promise.all(urls.map(url => imageProcessor(url).then(sizes => sizes)))
      .then(result => cb(null, result))
    },
    (images, cb) => {
      const docs = images.map(urls => {
        return { urls: urls.map(url => `${host}/${url}`) }
      });

      Image.collection.insert(docs, err => {
        if(err) return cb(err);
        cb();
      })
    },
    cb => Image.find({}, (err, docs) => cb(null, docs))
  ], (err, result) => {
    if(err) res.sendStatus(500);
    res.json({
      images: result 
    });
  })
});

app.use('/images', express.static(__dirname + '/images', { redirect : false }));

module.exports = app;
