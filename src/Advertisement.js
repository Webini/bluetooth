const services = require('./struct/services');

/**
 * https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/doc/advertising-api.txt
 */
class Advertisement {
  constructor(path) {
    this.path = path || '/nodejs/advertisement';

    // Possible values: "broadcast" or "peripheral"
    this.type = 'peripheral';

    this.serviceUUIDs = [ services.AudioSource ];
    this.manufacturerData = {};
    this.solicitUUIDs = [ ];
    this.serviceData = {};
    //options tx-power, appearance, local-name (https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/src/advertising.c#n413)
    this.includes = [ 'tx-power' ];  // debian buster bug with appearance 
    this.localName = '';
    //https://www.bluetooth.com/ja-jp/specifications/gatt/viewer?attributeXmlFile=org.bluetooth.characteristic.gap.appearance.xml
    this.appearance = 963;
    this.duration = 0;
    this.timeout = 0;
    this.secondaryChannel = '1M';
  }

  release() {
    throw new Error('You must implement release method');
  }
}

module.exports = Advertisement;