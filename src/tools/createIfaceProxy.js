module.exports = function (advertisement, interface) {
  const proxy = {
    get: function (advertisement, prop) {
      const lowerName = prop.substr(0, 1).toLowerCase() + prop.substr(1);
      const value = advertisement[lowerName];
      
      if (interface.methods[prop]) {
        return value;
      }

      if (!interface.properties[prop] && prop !== 'emit') {
        throw new Error(`The property ${prop} is not present in this interface`);
      }
      
      const type = interface.properties[prop];

      switch (type) {
      case 'as':
        return [ value ];
      case 'a{qay}':
        return [ Object.keys(value).reduce((out, key) => {
          out.push([ parseInt(key), value[key] ]);
          return out;
        }, []) ];
      case 'a{say}':
        return [ Object.keys(value).reduce((out, key) => {
          out.push([ key, value[key] ]);
          return out;
        }, []) ];
      } 
      
      return value;
    }
  };

  return new Proxy(advertisement, proxy);
}