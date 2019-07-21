import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.component.html',
  styleUrls: ['./escaner.component.scss'],
})
export class EscanerComponent implements OnInit {

  // Para guardar el texto leído del QR
  textoQR = null;

  // Variable Output para enviar después los datos leidos del QR
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onReadDevice = new EventEmitter();

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {}

  // Manejador Click de leerCodigo QR
  leerCodigo() {

    this.barcodeScanner.scan().then(barcodeData => {

      this.textoQR = barcodeData.text;

      // Envia los datos leidos del QR a la pagina crear preferencia.
      this.onReadDevice.emit(this.textoQR);

     }).catch(err => {
         console.log('Error', err);
     });
  }

}
