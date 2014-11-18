
module.exports = validate;

var regexps = require('regexps');
var escapehtml = require('escape-html');
var collapse = require('collapse-whitespace');

function Exception (msg, key, val, type) {
  this.message = msg;
  this.key = key;
  this.val = val;
  this.type = type;
}

Exception.prototype.toString = function () {
  return this.message;
};

function validate (key, val, type) {
  if (arguments.length === 2) {
    type = val;
    val = key;
    key = null;
  }

  val = escapehtml(collapse(String(val)));
  
  var err;

  if (val.length === 0)
    throw new Exception('missing', key, val, type);

  if (regexps.hasOwnProperty(type)) {
    if (!val.match(regexps[type]))
      throw new Exception('invalid', key, val, type);
  } else {
    var parts = type.split('_');
    var els = val.split(',');
    if (els.length === 0)
      throw new Exception('empty', key, val, type);

    return els.map(function (n) {
      return validate(key, n, parts[0]);
    });
  }
  return val;
}
