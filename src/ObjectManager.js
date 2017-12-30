const service = require('./dbus.js');
const promisify = require('./promisify');
const createObject = require('./struct/object');
const EventEmitter = require('events');

class ObjectManager extends EventEmitter {
  constructor() {
    super();
    this.manager = null;
  }

  async getManager() {
    if (this.manager === null) {
      this.manager = await service.getInterface('/', 'org.freedesktop.DBus.ObjectManager');
      
      promisify(this.manager, 'GetManagedObjects');
      
      this.manager.on('InterfacesAdded', (name, values) => {
        const adapter = createObject([name, values], { depth: 50 });
        this.emit('new', adapter);
      });
      
      this.manager.on('InterfacesRemoved', (name) => {
        this.emit('removed', name);
      });
    }

    return this.manager;
  }

  async getObjects() {
    const manager = await this.getManager();
    const objects = await manager.GetManagedObjects();
    const output = [];
    
    if (objects.length <= 1) {
      return output;
    }

    objects.slice(1).forEach(adapter => {
      output.push(createObject(adapter));
    })

    return output;
  }  
}

module.exports = new ObjectManager();