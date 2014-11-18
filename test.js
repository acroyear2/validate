
var assert = require('assert');
var validate = require('./build/build.js');

var valid = {
  int: 1,
  double: 3.4,
  email: 'email@example.com',
  alpha: 'boop',
  alphanumeric: 'district9',
  guid: '21EC2020-3AEA-4069-A2DD-08002B30309D',
  date: '1999-08-22'
};

var invalid = {
  int: 1.3,
  double: 'beep',
  email: 'email@example',
  alpha: 'district9',
  alphanumeric: 'district9@',
  guid: '1EC2020-3AEA-4069-A2DD-08002B30309D',
  date: '1999-34-22'
};

Object.keys(valid).forEach(function (k) {
  assert(validate(valid[k], k));
});

Object.keys(invalid).forEach(function (k) {
  var res;
  try {
    validate(invalid[k], k);
  } catch(e) {
    assert.equal(e.type, k);
    assert.equal(e.val, invalid[k]);
    return;
  }
  assert(false, true);
});

try { // keys
  validate('keyname', 1.2, 'int');
} catch (e) {
  assert.equal(e.key, 'keyname');
}

// arrays
var arr = ['beep', 'boop'];
assert(validate(arr, 'alpha_'));
arr = ['beep', 'boop', 1];
try {
  assert(validate(arr, 'alpha_'));
} catch(e) {
  assert.equal(e.type, 'alpha');
  assert.equal(e.val, 1);
}
