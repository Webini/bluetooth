const manager = require('./ObjectManager');
const agentManager = require('./AgentManager');
const { inspect } = require('util');
const Agent = require('./Agent');
const Advertisement = require('./Advertisement');

(async function() {
  try {
    const agent = new Agent();
    await agentManager.registerAgent(agent);
    await agentManager.requestDefaultAgent(agent);
    
    manager.on('new', (async (object) => {
      console.log(object.name);//, { depth: 50 });
      try {
        if (object.isAdapter) {
          await object.adapter.setDiscoverableTimeout(0);
          await object.adapter.setDiscoverable(true);
          await object.adapter.setPairable(true);
          await object.adapter.setPairableTimeout(0);
          // await object.adapter.setAlias('');
          await object.adapter.setPowered(true);
          // await object.adapter.setClass(0x20041C);
          console.log(await object.properties.getAll());

          const advertisement = new Advertisement();
          await object.advertising.registerAdvertisement(advertisement);
          // await object.adapter.startDiscovery();
        }
      } catch(e) {
        console.log('Catch on new', e)
      }
    }));
    await manager.initialize();
    
    manager.on('removed', (name) => console.log('removed', name));
  } catch(e) {
    console.log('catch glob', e);
  }
})();