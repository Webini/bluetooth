module.exports = {
  name: 'org.bluez.LEAdvertisement1',
  methods: {
    Release: [ '', '', [], [] ]
  },
  signals: {},
  properties: {
    Type: 's',
    ServiceUUIDs: 'as',
    SolicitUUIDs: 'as',
    ManufacturerData: 'a{qay}',
    ServiceData: 'a{say}',
    Includes: 'as',
    LocalName: 's',
    Appearance: 'q',
    Duration: 'q',
    Timeout: 'q'
  }
};