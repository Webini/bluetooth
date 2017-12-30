const manager = require('./ObjectManager');
const agentManager = require('./AgentManager');
const { inspect } = require('util');
const Agent = require('./Agent');

(async function() {
  try {
    const objects = await manager.getObjects();
    console.log(inspect(objects, { depth: 50 }));
  
    if (objects.length) {
      // await objects[0].adapter.startDiscovery();
      await objects[0].adapter.setPowered(true);
    }

    const agent = new Agent();
    await agentManager.registerAgent(agent);

  } catch(e) {
    console.log(e);
  }
})();