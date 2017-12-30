const dbus = require('dbus-native');
const promisify = require('./promisify');
const bus = dbus.systemBus();
const debug = require('debug')('bluetooth');

if (!bus) {
  throw new Error('Could not connect to the DBus session bus');
}

bus.connection.on('error', function (err) {
  debug('Dbus error', err);
  throw err;
});

bus.connection.on('end', function () {
  debug('Dbus end');
  process.exit(1);
});

const service = bus.getService('org.bluez');
promisify(service, 'getInterface');

module.exports = service;