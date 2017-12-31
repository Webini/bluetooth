# Bluetooth



# System configuration

## Activate advertisement
Add --experimental flag to bluetoothd in systemd bluetooth file (`/etc/systemd/system/bluetooth.target.wants/bluetooth.service`) at `ExecStart` .  

## Activate DBUS 
If your user has no dbus socket, run `apt-get install dbus-user-session` and verify if dbus is enable and running  `systemctl --user enable dbus.service && systemctl --user status dbus.service` 

## Configure dbus acl
If you run this app as an unprivileged user (recommanded), edit `/etc/dbus-1/system.d/bluetooth.conf` and add this
```xml
    <allow own="org.bluez.LEAdvertisement1" />
    <allow own="org.bluez.Agent1" />
    <allow send_destination="org.bluez.Agent1"/>
    <allow send_destination="org.bluez.LEAdvertisement1"/>
```   
to the policy `<policy group="bluetooth"></policy>`   
Don't forget to check if the user running your application is added to group bluetooth.