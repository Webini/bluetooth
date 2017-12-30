const manager = require('./ObjectManager');
const { inspect } = require('util');

(async function() {
  try {
    const objects = await manager.getObjects();
    console.log(inspect(objects, { depth: 50 }));
  
    if (objects.length) {
      // await objects[0].adapter.startDiscovery();
      await objects[0].adapter.setPowered(true);
    }
  } catch(e) {
    console.log(e);
  }
})();