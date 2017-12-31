const { service } = require('./dbus.js');
const promisify = require('./promisify');
const createObject = require('./struct/object');
const EventEmitter = require('events');

class ObjectManager extends EventEmitter {
  constructor() {
    super();
    this.manager = null;
    this.objects = {};
  }

  async getManager() {
    if (this.manager === null) {
      await this.initialize();
    }
    return this.manager;
  }

  async initialize() {
    if (this.manager) {
      return this;
    }

    this.manager = await service.getInterface('/', 'org.freedesktop.DBus.ObjectManager');
    promisify(this.manager, 'GetManagedObjects');
    await this._insertObjects(this.manager);

    this.manager.on('InterfacesAdded', (name, values) => {
      if (!this.getObject(name)) {
        this._createObject(name, values);
      } 
    });
    
    this.manager.on('InterfacesRemoved', (name) => {
      this._deleteObject(name);
    });

    return this;
  }
  
  _deleteObject(name) {
    if (this.objects[name]) {
      delete this.objects[name];
      this.emit('removed', name);
    }
    return this;
  }

  _createObject(name, values) {
    const object = createObject([ name, values ]);
    this.objects[name] = object;
    this.emit('new', object);
    return object;
  }

  getObject(name) {
    return this.objects[name];
  }

  getObjects() {
    return this.objects;
  }

  async _insertObjects(manager) {
    const objects = await manager.GetManagedObjects();
    if (objects.length <= 1) {
      return;
    }

    objects.slice(1).forEach(data => {
      if (!this.getObject(data[0])) {
        this._createObject(data[0], data[1]);
      }
    })
  }  
}

module.exports = new ObjectManager();