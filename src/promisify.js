const { promisify } = require('util');

module.exports = function(object, methods = [], bindTo = null) {
  if (!Array.isArray(methods)) {
    methods = [ methods ];
  }

  methods.forEach((method) => {
    if (bindTo) {
      object[method] = promisify(object[method].bind(bindTo === true ? object : bindTo));
    } else {
      object[method] = promisify(object[method]);  
    }
  });

  return object;
};