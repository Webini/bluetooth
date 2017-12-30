const dbus = require('dbus-native');
const promisify = require('./promisify');
const bus = dbus.systemBus();
const sessionBus = dbus.sessionBus();
const debug = require('debug')('bluetooth');

if (!bus || !sessionBus) {
  throw new Error('Could not connect to the DBus session bus');
}

bus.connection.on('error', function (err) {
  debug('System Dbus error', err);
  throw err;
});

bus.connection.on('end', function () {
  debug('System Dbus end');
  process.exit(1);
});

sessionBus.connection.on('error', function (err) {
  debug('Session Dbus error', err);
  throw err;
});

sessionBus.connection.on('end', function () {
  debug('Session Dbus end');
  process.exit(1);
});

const service = bus.getService('org.bluez');
promisify(service, 'getInterface');
promisify(bus, 'requestName');
promisify(sessionBus, 'requestName');

module.exports = {
  service,
  bus,
  sessionBus
};