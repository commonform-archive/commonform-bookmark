var version = require('commonform-version');
var validate = require('commonform-validate');
var Immutable = require('immutable');
var isMap = Immutable.Map.isMap.bind(Immutable.Map);

var digest = validate.digest.bind(validate);
var term = validate.term.bind(validate);

var bookmarkName = exports.bookmarkName = function(argument) {
  return (
    term(argument) &&
    argument.indexOf('@') < 0
  );
};

var propertyIs = function(argument, key, predicate) {
  return (
    argument.has(key) &&
    predicate(argument.get(key))
  );
};

module.exports = function(argument) {
  return (
    isMap(argument) &&
    propertyIs(argument, 'version', version) &&
    propertyIs(argument, 'name', bookmarkName) &&
    propertyIs(argument, 'form', digest)
  );
};

module.exports.version = '1.0.0';
