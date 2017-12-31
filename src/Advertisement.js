const services = require('./struct/services');

/**
 * https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/doc/advertising-api.txt
 */
class Advertisement {
  constructor(path = '/nodejs/advertisement') {
    this.path = path;

    // Possible values: "broadcast" or "peripheral"
    this.type = 'peripheral';

    this.serviceUUIDs = [
      services.AdvancedAudioDistribution,
      services.AudioSource,
      services.HandsfreeAudioGateway,
      services.Handsfree
    ];

    this.manufacturerData = {};
    this.solicitUUIDs = [ services.AudioSource ];
    this.serviceData = {};
    //options tx-power, appearance, local-name (https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/src/advertising.c#n413)
    this.includes = [ 'tx-power', 'appearance', 'local-name' ];  
    this.localName = 'BlueNode';
    //https://devzone.nordicsemi.com/documentation/nrf51/4.4.0/html/group___b_l_e___a_p_p_e_a_r_a_n_c_e_s.html
    this.appearance = 963;
    this.duration = 0;
    this.timeout = 0;
  }

  release() {
    throw new Error('You must implement release method');
  }
}

module.exports = Advertisement;