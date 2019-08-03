import { Injectable } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Injectable({
  providedIn: 'root'
})
export class DeviceServicesService {

  constructor(private uid: Uid, private androidPermissions: AndroidPermissions) { }


  async getMAC() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );

    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );

      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }

    return this.uid.MAC;
  }
}
