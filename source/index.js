var Immutable = require('immutable');
var isMap = Immutable.Map.isMap.bind(Immutable.Map);
var validate = require('commonform-validate');
var version = require('commonform-version');

var term = validate.term.bind(validate);

var props = {
  form: validate.digest.bind(validate),
  name: function(argument) {
    return term(argument) && argument.indexOf('@') < 0;
  },
  version: version
};

module.exports = function(argument) {
  return isMap(argument) && Object.keys(props).every(function(key) {
    return argument.has(key) && props[key](argument.get(key));
  });
};

module.exports.version = '1.0.0';
