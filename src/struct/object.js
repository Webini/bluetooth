const get = require('lodash.get');
const objectify = require('./objectify');
const Adapter = require('../Adapter');
const INTERFACES = require('./interfaces');

module.exports = function (objectData) {
  const object = {};

  object.name = objectData[0];

  object.interfaces = objectData[1].reduce((interfaces, [ name, values ]) => {
    interfaces[name] = objectify(values);
    return interfaces;
  }, {});

  object.findInterface = function (interface) {
    const interfaces = Object
      .keys(this.interfaces)
      .filter((name) => interface.test(name))
    ;
    
    if (interfaces.length > 0) {
      return interfaces[0];
    }

    return null;
  };

  object.adapter = new Adapter(object);

  return object;
};