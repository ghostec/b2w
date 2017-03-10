const endpoint = 'http://54.152.221.29/images.json';
const { map } = require('async');

module.exports = () => {
  return new Promise(resolve => {
    fetch(endpoint, {
      method: 'GET',
      headers: {'Accept': 'application/json'},
    }).then(response => {
      if(response.status >= 400) throw new Error('Bad response from server');
      return response.json();
    }).then(json => {
      const transform = (el, cb) => cb(null, el.url);
      map(json.images, transform, (err, result) => resolve(result));
    });
  });
}
