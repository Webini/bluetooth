const EventEmitter = require('events');
const { service } = require('./dbus');
const promisify = require('./promisify');
const objectify = require('./tools/objectify');

const METHODS = [
  'Get',
  'GetAll',
  'Set'
];

class Properties extends EventEmitter {
  constructor(objectName, ifaceName, propIfaceName) {
    super();
    this.objectName = objectName;
    this.ifaceName = ifaceName;
    this.propIfaceName = propIfaceName;
    this.iface = null;
  }

  async initialize() {
    if (this.iface) {
      return;
    }

    this.iface = await service.getInterface(this.objectName, this.ifaceName);
    promisify(this.iface, METHODS);

    this.iface.on('PropertiesChanged', (ifaceName, values, unk) => {
      this.emit('changed', objectify(values));
    });
  }

  async getIface() {
    if (this.iface === null) {
      await this.initialize();
    }
    return this.iface;
  }

  async getAll() {
    const iface = await this.getIface();
    const result = await iface.GetAll(this.propIfaceName);
    return objectify(result);
  }
}

module.exports = Properties;