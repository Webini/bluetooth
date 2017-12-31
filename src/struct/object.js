const get = require('lodash.get');
const objectify = require('./objectify');
const Adapter = require('../Adapter');
const Properties = require('../Properties');
const AdvertisingManager = require('../AdvertisingManager');
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

  const adapterIface = object.findInterface(INTERFACES.adapter);
  if (adapterIface) {
    object.adapter = new Adapter(object);
    object.isAdapter = true;
  }

  const deviceIface = object.findInterface(INTERFACES.device);
  if (deviceIface) {
    object.device = null; //@todo
  }
  
  const propertiesIface = object.findInterface(INTERFACES.properties);
  if (propertiesIface && (adapterIface || deviceIface)) {
    object.properties = new Properties(object.name, propertiesIface, adapterIface || deviceIface);
    object.hasProperties = true;
  }

  const advertisingIface = object.findInterface(INTERFACES.advertisingManager);
  if (advertisingIface) {
    object.advertising = new AdvertisingManager(object.name, advertisingIface);
    object.hasAdvertising = true;
  }

  return object;
};