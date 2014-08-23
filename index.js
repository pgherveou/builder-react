var fs = require('fs');
var crypto = require('crypto');
var transform = require('react-tools').transform;

var cache = Object.create(null);

function calculate(string) {
  return crypto.createHash('sha256').update(string).digest('hex');
}

module.exports = function () {

  return function react(file, done) {
    if (file.extension !== 'jsx' && file.extension !== 'js') return done();
    file.read(function (err, string) {
      if (err) return done(err);
      if (string.indexOf('jsx') < 0) return done();
      var hash = file.filename + '#' + calculate(string);
      try {
        file.string = cache[hash] = cache[hash] || transform(string);
        file.extension = 'js';
        done();
      } catch (e) {
        e.fileName = file.filename;
        return done(e);
      }
    });
  };
};

