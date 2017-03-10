require('es6-promise').polyfill();
require('isomorphic-fetch');
const request = require('supertest');
const app = require('app');
const imageProcessor = require('image_processor');
const fetchPayload = require('payload');
const chai = require('chai');
chai.use(require('chai-fs'));
const assert = chai.assert;
const { waterfall, } = require('async');
const Image = require('image_model');

describe('test suite', () => {
  it('GET images urls from endpoint', done => {
    fetchPayload().then(arr => {
      assert.deepEqual(arr, [
        'http://54.152.221.29/images/b737_5.jpg',
        'http://54.152.221.29/images/b777_5.jpg',
        'http://54.152.221.29/images/b737_3.jpg',
        'http://54.152.221.29/images/b777_4.jpg',
        'http://54.152.221.29/images/b777_3.jpg',
        'http://54.152.221.29/images/b737_2.jpg',
        'http://54.152.221.29/images/b777_2.jpg',
        'http://54.152.221.29/images/b777_1.jpg',
        'http://54.152.221.29/images/b737_4.jpg',
        'http://54.152.221.29/images/b737_1.jpg'
      ]);
      done();
    });
  });

  it('imageProcessor creates 3 sizes for given url', done => {
    waterfall([
      cb => fetchPayload().then(images => cb(null, images)),
      (images, cb) => imageProcessor(images[0]).then(res => cb(null, res))
    ], (err, result) => {
      assert.deepEqual(result, [
        'images/b737_5_small.jpg',
        'images/b737_5_medium.jpg',
        'images/b737_5_large.jpg'
      ]);
      assert.isFile('images/b737_5_small.jpg');
      assert.isFile('images/b737_5_medium.jpg');
      assert.isFile('images/b737_5_large.jpg');
      done();
    });
  }).timeout(10000);

  it('GET / response is json of image sizes urls', done => {
    request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) throw err;
      assert.deepEqual(res.body.images[0], { urls: [
        'http://localhost:8080/images/b737_5_small.jpg',
        'http://localhost:8080/images/b737_5_medium.jpg',
        'http://localhost:8080/images/b737_5_large.jpg'
      ] });

      // Mongoose
      Image.find({}, (err, docs) => {
        assert.lengthOf(docs, 10);
        assert.deepEqual(docs[0].toJSON(), { urls: [
          'http://localhost:8080/images/b737_5_small.jpg',
          'http://localhost:8080/images/b737_5_medium.jpg',
          'http://localhost:8080/images/b737_5_large.jpg'
        ] });
        done();
      });
    })
  }).timeout(30000);
});
