class Agent {
  constructor() {
    this.val = 'lala';
  }
  //dbus-send --type=method_call --print-reply --session --dest=org.bluez.Agent1 /nodejs/agent org.bluez.Agent1.Release
  release() {
    console.log('release', this.val);
  }
  requestPinCode(device, pin) {
    console.log('requestPinCode', device, pin);
  }
  displayPinCode(device, pin) {
    console.log('displayPinCode', device, pin);
  }
  requestPasskey(device, pin) {
    console.log('requestPasskey', device, pin);
  }
  displayPasskey(device, passKey, entered) {
    console.log('displayPasskey', device, passKey, entered);
  }
  requestConfirmation(device, passKey) {
    console.log('requestConfirmation', device, passKey);
  }
  requestAuthorization(device) {
    console.log('requestAuthorization', device);
  }
  authorizeService(device, uuid) {
    console.log('authorizeService', device);
  }
  cancel() {
    console.log('cancel');
  }
  emit() {
    console.log('emit', arguments);
  }
}

module.exports = Agent;