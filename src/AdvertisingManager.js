const { service, bus } = require('./dbus.js');
const promisify = require('./promisify');
const EventEmitter = require('events');
const AdvertisementInterface = require('./AdvertisementInterface');
const createIfaceProxy = require('./tools/createIfaceProxy');

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

    bus.exportInterface(
      createIfaceProxy(advertisement, AdvertisementInterface), 
      advertisement.path, 
      AdvertisementInterface
    );

    await manager.RegisterAdvertisement(advertisement.path, options);
  }

  async unregisterAdvertisement(service) {
    const manager = await this.getManager();
    await manager.UnregisterAdvertisement(service);
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