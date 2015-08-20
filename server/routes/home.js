var fs = require('co-fs');

module.exports = function* (next){
  this.type = 'text/html';
  this.body = yield fs.readFile('./dist/index.html');
};