## Activate advertisement
Add --experimental flag to bluetoothd in systemd bluetooth file.

## Configure dbus acl
If you run this app as an unprivileged user (recommanded), edit `/etc/dbus-1/system.d/bluetooth.conf` and add this
```xml
    <allow own="org.bluez.LEAdvertisement1" />
    <allow own="org.bluez.Agent1" />
    <allow send_destination="org.bluez.Agent1"/>
    <allow send_destination="org.bluez.LEAdvertisement1"/>
```   
to the policy `<policy group="bluetooth">` 
