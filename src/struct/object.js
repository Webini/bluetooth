const objectify = require('../tools/objectify');
const Adapter = require('../Adapter');
const Properties = require('../Properties');
const AdvertisingManager = require('../AdvertisingManager');
const Device = require('../Device');
const INTERFACES = require('./interfaces');

module.exports = function ([ name, values ]) {
  const object = {};

  object.name = name;

  object.interfaces = values.reduce((interfaces, [ name, values ]) => {
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
    object.device = new Device(object.name, deviceIface);
    object.isDevice = true;
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