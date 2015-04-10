/* jshint node: true, mocha: true */
var Immutable = require('immutable');
var crypto = require('crypto');
var expect = require('chai').expect;
var validate = require('..');

var VALID_DIGEST = crypto.createHash('sha256')
  .update('')
  .digest('hex');

describe('Bookmarks', function() {
  it('accepts a valid example', function() {
    var bookmark = Immutable.fromJS({
      name: 'stock purchase agreement',
      version: '2.0.1',
      form: VALID_DIGEST
    });
    expect(validate(bookmark))
      .to.equal(true);
  });

  it('cannot have names with "@"', function() {
    var bookmark = Immutable.fromJS({
      name: 'Stock @ Agreement',
      version: '2.0.1',
      form: VALID_DIGEST
    });
    expect(validate(bookmark))
      .to.equal(false);
  });
});
