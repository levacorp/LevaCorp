import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-menuslider',
  templateUrl: './menuslider.component.html',
  styleUrls: ['./menuslider.component.scss'],
})
export class MenusliderComponent implements OnInit {

    datosEscaneado = {};
  constructor(private menu: MenuController, private barcodeScanner: BarcodeScanner) { }
  ngOnInit() {}

  leerCodigo()
  {
    this.barcodeScanner.scan().then(barcodeData => {
      this.datosEscaneado = barcodeData;
      console.log("IMPRIMEEEE"+this.datosEscaneado);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
