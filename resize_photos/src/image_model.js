const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    urls: { type: [String], required: true }
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        return { urls: ret.urls };
      }
    }
  }
);

module.exports = mongoose.model('Image', schema);
