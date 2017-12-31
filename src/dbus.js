const dbus = require('dbus-native');
const promisify = require('./promisify');
const bus = dbus.systemBus();
const debug = require('debug')('bluetooth');

if (!bus) {
  throw new Error('Could not connect to the System DBus');
}

bus.connection.on('error', function (err) {
  debug('System Dbus error', err);
  throw err;
});

bus.connection.on('end', function () {
  debug('System Dbus end');
  process.exit(1);
});

const service = bus.getService('org.bluez');
promisify(service, 'getInterface');
promisify(bus, 'requestName');

module.exports = {
  service,
  bus
};