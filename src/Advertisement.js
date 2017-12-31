const services = require('./struct/services');

/**
 * https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/doc/advertising-api.txt
 */
class Advertisement {
  constructor(path = '/nodejs/advertisement') {
    this.path = path;

    // Possible values: "broadcast" or "peripheral"
    this._type = 'peripheral';

    this._serviceUUIDs = [
      services.AudioSource,
      services.HandsfreeAudioGateway,
      services.Handsfree
    ];

    this._manufacturerData = {};
    this._solicitUUIDs = [ services.AudioSource ];
    this._serviceData = {};
    //options tx-power, appearance, local-name (https://git.kernel.org/pub/scm/bluetooth/bluez.git/tree/src/advertising.c#n413)
    this._includes = [ 'tx-power', 'appearance', 'local-name' ];  
    this._localName = 'BlueNode';
    //https://devzone.nordicsemi.com/documentation/nrf51/4.4.0/html/group___b_l_e___a_p_p_e_a_r_a_n_c_e_s.html
    this._appearance = 963;
    this._duration = 0;
    this._timeout = 0;
  }

  get type() {
    return this._type;
  }
  get serviceUUIDs() {
    return [ this._serviceUUIDs ];
  }
  get manufacturerData() {
    return [ Object.keys(this._manufacturerData).reduce((out, key) => {
      out.push([ parseInt(key), this._manufacturerData[key] ]);
      return out;
    }, []) ];
  }
  get solicitUUIDs() {
    return [ this._solicitUUIDs ];
  }
  get serviceData() {
    return [ Object.keys(this._serviceData).reduce((out, key) => {
      out.push([ key, this._serviceData[key] ]);
      return out;
    }, []) ];
  }
  get includes() {
    return [ this._includes ];
  }
  get localName() {
    return this._localName;
  }
  get appearance() {
    return this._appearance;
  }
  get duration() {
    return this._duration;
  }
  get timeout() {
    return this._timeout;
  }

  release() {
    console.log('Release advertisement');
  }
}

module.exports = Advertisement;