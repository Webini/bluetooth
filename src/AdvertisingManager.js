const { service, bus, sessionBus } = require('./dbus.js');
const promisify = require('./promisify');
const createObject = require('./struct/object');
const EventEmitter = require('events');
const AdvertisementInterface = require('./AdvertisementInterface');
const createIface = require('./struct/createIface');

const METHODS = [
  'RegisterAdvertisement', 
  'UnregisterAdvertisement'
];

const PROPERTIES = {
  ActiveInstances: false,
  SupportedInstances: false,
  SupportedIncludes: false
};

class AdvertisingManager extends EventEmitter {
  constructor(adapterName, managerName) {
    super();
    this.adapterName = adapterName;
    this.managerName = managerName;
    this.manager = null;
    this.nameRequested = false;
  }

  async getManager() {
    if (this.manager === null) {
      this.manager = await service.getInterface(this.adapterName, this.managerName);
      promisify(this.manager, METHODS, true);
    }

    return this.manager;
  }

  async registerAdvertisement(advertisement, options = []) {
    const manager = await this.getManager();
    if (!this.nameRequested) {
      const retCode = await bus.requestName(AdvertisementInterface.name, 0x04);
      
      if (retCode !== 1) {
        throw new Error(`Cannot register service ${AdvertisementInterface.name}`);
      }
      this.nameRequested = true;
    }
    console.log(createIface(advertisement), advertisement.path, AdvertisementInterface.name);

    bus.exportInterface(createIface(advertisement), advertisement.path, AdvertisementInterface);
    await manager.RegisterAdvertisement(advertisement.path, options);
  }

  async unregisterAdvertisement(advertisement) {
    const manager = await this.getManager();
    await manager.UnregisterAdvertisement(advertisement.path);
  }
}

Object.keys(PROPERTIES).forEach((name) => {
  AdvertisingManager.prototype[`get${name}`] = async function() {
    const iface = await this.getInterface();
    return iface[name];
  };
  if (PROPERTIES[name]) {
    AdvertisingManager.prototype[`set${name}`] = async function(value) {
      const iface = await this.getInterface();
      iface[name] = value;
      return this;
    };
  }
});

module.exports = AdvertisingManager;