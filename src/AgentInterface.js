module.exports = {
  name: 'org.bluez.Agent1',
  methods: {
    Release: [ '', '', [], [] ],
    RequestPinCode: [ 'o', 's', [ 'Device' ], [ 'Pin code' ] ],
    DisplayPinCode: [ 'os', '', [ 'Device', 'Pin code'], [] ],
    RequestPasskey: [ 'o', 'u', [ 'Device' ], [ 'Passkey' ] ],
    DisplayPasskey: [ 'ouq', '', [ 'Device', 'Passkey', 'Entered' ], [] ],
    RequestConfirmation: [ 'ou', '', [ 'Device', 'Passkey' ], [] ],
    RequestAuthorization: [ 'o', '', [ 'Device' ], [] ],
    AuthorizeService: [ 'os', '', [ 'Device', 'UUID' ], [] ],
    Cancel: [ '', '', [], [] ]
  },
  signals: {},
  properties: {}
};