module.exports = function(agent) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(agent));
  return methods
    .reduce((out, name) => {
      const value = agent[name]; 
      const upperName = name.substr(0, 1).toUpperCase() + name.substr(1);
      if (typeof value === 'function') {
        out[upperName] = value.bind(agent);
      } else {
        out[upperName] = value;
      }
      return out;
    }, {})
  ;
};