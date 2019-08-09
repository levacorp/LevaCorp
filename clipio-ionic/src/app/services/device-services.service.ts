import { Injectable } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
  providedIn: 'root'
})
export class DeviceServicesService {

  constructor(private uid: Uid, private androidPermissions: AndroidPermissions) { }

  getID_UID(type) {
    if (type === 'IMEI') {
      return this.uid.IMEI;
    } else if (type === 'ICCID') {
      return this.uid.ICCID;
    } else if (type === 'IMSI') {
      return this.uid.IMSI;
    } else if (type === 'MAC') {
      return this.uid.MAC;
    }
  }

  getPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if (res.hasPermission) {
      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          
        }).catch(error => {
          alert('Error al obtener la MAC! ' + error);
        });
      }
    }).catch(error => {
      alert('Error al obtener la MAC! ' + error);
    });
    return;
  }
}
