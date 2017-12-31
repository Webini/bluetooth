const EventEmitter = require('events');
const { service } = require('./dbus.js');
const INTERFACES = require('./struct/interfaces');
const promisify = require('./promisify');
const { inspect } = require('util');

const METHODS = [
  'Connect',
  'Disconnect',
  'ConnectProfile',
  'DisconnectProfile',
  'Pair',
  'CancelPairing',
];

const PROPERTIES = {
  Address: false,
  AddressType: false,
  Name: false,
  Icon: false,
  Class: false,
  Appearance: false,
  UUIDs: false,
  Paired: true,
  Connected: true,
  Trusted: true,
  Blocked: true,
  Alias: true,
  Adapter: false,
  LegacyPairing: fasle,
  Modalias: false,
  RSSI: false,
  TxPower: false,
  ManufacturerData: false,
  ServiceData: false,
  ServicesResolved: false,
  AdvertisingFlags: false,
};

class Device extends EventEmitter {
  constructor(object) {
    super();
    this.object = object;
    this.iface = null;
  }
  
  async getInterface() {
    if (this.iface === null) {
      this.iface = await service.getInterface(
        this.object.name,
        this.object.findInterface(INTERFACES.adapter)
      );

      promisify(this.iface, METHODS);
    }
    return this.iface;
  }

  async startDiscovery() {
    const iface = await this.getInterface();
    await iface.StartDiscovery();
  }

  async stopDiscovery() {
    const iface = await this.getInterface();
    await iface.StopDiscovery();
  }

  /**
   * https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/doc/adapter-api.txt
   * @param {*} filters 
   */
  async setDiscoveryFilter(filters) {
    const iface = await this.getInterface();
    await iface.SetDiscoveryFilter(filters);
  }

  async removeDevice(device) {
    const iface = await this.getInterface();
    return await iface.RemoveDevice();
  }
}

Object.keys(PROPERTIES).forEach((name) => {
  Adapter.prototype[`get${name}`] = async function() {
    const iface = await this.getInterface();
    return iface[name];
  };
  if (PROPERTIES[name]) {
    Adapter.prototype[`set${name}`] = async function(value) {
      const iface = await this.getInterface();
      iface[name] = value;
      return this;
    };
  }
});

module.exports = Adapter;