import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-lectura-qr',
  templateUrl: './lectura-qr.page.html',
  styleUrls: ['./lectura-qr.page.scss'],
})
export class LecturaQRPage implements OnInit {

  direccion: string;
  dataActuadores: any = null;
  dataDispositivo: any = null;
  dataActuadoresYSensores: any = null;

  data: any = null;
  id: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private nativeHttp: HTTP,
    private plt: Platform, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.direccion = this.route.snapshot.paramMap.get('dir');
    this.id = this.route.snapshot.paramMap.get('id');
    this.getEverywhere();
    /*if (id === '1') {
      this.dataActuadoresYSensores = this.data;
    } else if (id === '2') {
      this.dataActuadores = this.data;
    } else if (id === '3') {
      this.dataDispositivo = this.data;
    }*/
  }

  async getStandard() {
    let loading = await this.loadingCtrl.create({message: 'Please wait...'});
    await loading.present();

    this.http.get('/api/films').pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
        this.data = data['results'];
      }, err => {
        console.log('JS Call error', err);
      });
  }

  async getNativeHttp() {
    let loading = await this.loadingCtrl.create({message: 'Please wait...'});
    await loading.present();

    let nativeCall = this.nativeHttp.get('http://swapi.co/api/films', { }, {
      'Content-Type': 'application/json'
    });

    from(nativeCall).pipe(
      finalize(() => loading.dismiss())
    )
    .subscribe(data => {
        console.log('native data:', data);
        let parsed = JSON.parse(data.data).results;
        this.data = parsed;
      }, err => {
        console.log('JS Call error', err);
      });
  }

  getEverywhere() {
    if (this.plt.is('cordova')) {
      this.getNativeHttp();
    } else {
      this.getStandard();
    }
  }

}
