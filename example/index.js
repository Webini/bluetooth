const manager = require('../src/ObjectManager');
const agentManager = require('../src/AgentManager');
const { inspect } = require('util');
const Agent = require('../src/Agent');
const Advertisement = require('../src/Advertisement');

(async function() {
  try {
    // To register an agent 
    // please overload Agent class
    // const agent = new Agent();
    // await agentManager.registerAgent(agent);
    // await agentManager.requestDefaultAgent(agent);
    
    manager.on('new', (async (object) => {
      console.log('new object', object.name);

      try {
        if (object.isAdapter) {
          await object.adapter.setDiscoverableTimeout(0);
          await object.adapter.setDiscoverable(true);
          await object.adapter.setPairable(true);
          await object.adapter.setPairableTimeout(0);
          await object.adapter.setAlias('Sample');
          await object.adapter.setPowered(true);
          
          console.log(await object.properties.getAll());
          object.properties.on('changed', value => {
            console.log(`${object.name} changed`, value);
          });

          //don't forget to overwrite the default advertisement values
          //with your needs
          const advertisement = new Advertisement();
          await object.advertising.registerAdvertisement(advertisement);
        }

        if (object.isDevice) {
          console.log(await object.properties.getAll());
          object.properties.on('changed', value => {
            console.log(`${object.name} changed`, value);
          });
        }
      } catch(e) {
        console.log('Catch on new', e);
      }
    }));

    await manager.initialize();
    
    manager.on('removed', (name) => console.log('removed', name));
  } catch(e) {
    console.log('catch glob', e);
  }
})();