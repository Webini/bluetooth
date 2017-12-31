class Agent {
  constructor(path = '/nodejs/agent') {
    this.path = path;
  }

  release() {
    throw new Error('You must implement release method');
  }
  requestPinCode(device) {
    throw new Error('You must implement requestPinCode method');
  }
  displayPinCode(device, pin) {
    throw new Error('You must implement displayPinCode method');
  }
  requestPasskey(device) {
    throw new Error('You must implement requestPasskey method');
  }
  displayPasskey(device, passKey, entered) {
    throw new Error('You must implement displayPasskey method');
  }
  requestConfirmation(device, passKey) {
    throw new Error('You must implement requestConfirmation method');
  }
  requestAuthorization(device) {
    throw new Error('You must implement requestAuthorization method');
  }
  authorizeService(device, uuid) {
    throw new Error('You must implement authorizeService method');
  }
  cancel() {
    throw new Error('You must implement cancel method');
  }
}

module.exports = Agent;