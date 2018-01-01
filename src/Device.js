const EventEmitter = require('events');
const { service } = require('./dbus.js');
const promisify = require('./promisify');
const promisifyOne = require('util').promisify;

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
  LegacyPairing: false,
  Modalias: false,
  RSSI: false,
  TxPower: false,
  ManufacturerData: false,
  ServiceData: false,
  ServicesResolved: false,
  AdvertisingFlags: false,
};

class Device extends EventEmitter {
  constructor(objectName, ifaceName) {
    super();
    this.objectName = objectName;
    this.ifaceName = ifaceName;
    this.iface = null;
  }
  
  async getInterface() {
    if (this.iface === null) {
      this.iface = await service.getInterface(
        this.objectName,
        this.ifaceName
      );

      promisify(this.iface, METHODS);
    }
    return this.iface;
  }

  async connect() {
    const iface = await this.getInterface();
    await iface.Connect();
  }

  async disconnect() {
    const iface = await this.getInterface();
    await iface.Disconnect();
  }

  async connectProfile(uuid) {
    const iface = await this.getInterface();
    await iface.ConnectProfile(uuid);
  }

  async disconnectProfile(uuid) {
    const iface = await this.getInterface();
    await iface.DisconnectProfile(uuid);
  }

  async pair() {
    const iface = await this.getInterface();
    await iface.Pair();
  }

  async cancelPairing() {
    const iface = await this.getInterface();
    await iface.CancelPairing();
  }
}

Object.keys(PROPERTIES).forEach((name) => {
  Device.prototype[`get${name}`] = async function() {
    const iface = await this.getInterface();
    const accessor = promisifyOne(iface[name]);
    return await accessor();
  };
  if (PROPERTIES[name]) {
    Device.prototype[`set${name}`] = async function(value) {
      const iface = await this.getInterface();
      iface[name] = value;
      return this;
    };
  }
});

module.exports = Device;