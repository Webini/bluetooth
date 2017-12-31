const get = require('lodash.get');

module.exports = function (arr) {
  const output = {};
  arr.forEach(kv => {
    const name = get(kv, '[0]', null);
    if (name) {
      output[name] = get(kv, '[1][1][0]', null);
    } 
  });
  return output;
};