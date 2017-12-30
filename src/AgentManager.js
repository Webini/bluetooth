const { service, bus, sessionBus } = require('./dbus.js');
const promisify = require('./promisify');
const createObject = require('./struct/object');
const EventEmitter = require('events');
const AgentInterface = require('./AgentInterface');
const AgentCapabilities = require('./AgentCapabilities');

const METHODS = [
  'RegisterAgent', //visiblement pour le object c'est juste une string avec le path dbus de l'agent
  'RequestDefaultAgent',
  'UnregisterAgent'
];

function createIface(agent) {
  const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(agent));
  return methods
    .reduce((out, name) => {
      const method = agent[name];
      if (typeof method === 'function') {
        const upperName = name.substr(0, 1).toUpperCase() + name.substr(1);
        out[upperName] = method.bind(agent);
      }
      return out;
    }, {})
  ;
}

class AgentManager extends EventEmitter {
  constructor() {
    super();
    this.manager = null;
    this.nameRequested = false;
  }

  async getManager() {
    if (this.manager === null) {
      this.manager = await service.getInterface('/org/bluez', 'org.bluez.AgentManager1');
      promisify(this.manager, METHODS);
    }

    return this.manager;
  }

  async registerAgent(agent, cap = AgentCapabilities.keyboardDisplay) {
    const manager = await this.getManager();
    if (!this.nameRequested) {
      const retCode = await sessionBus.requestName(AgentInterface.name, 0x04);
      
      if (retCode !== 1) {
        throw new Error(`Cannot register service ${AgentInterface.name}`);
      }
      this.nameRequested = true;
    }
    
    sessionBus.exportInterface(createIface(agent), agent.path, AgentInterface);
    await manager.RegisterAgent(agent.path, cap);
  }

  async unregisterAgent(agent) {
    const manager = await this.getManager();
    await manager.UnregisterAgent(agent.path);
  }

  async requestDefaultAgent(agent) {
    const manager = await this.getManager();
    await manager.RequestDefaultAgent(agent.path);
  }
}

module.exports = new AgentManager();