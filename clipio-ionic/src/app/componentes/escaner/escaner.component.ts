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

  ngOnInit() { }

  // Manejador Click de leerCodigo QR
  leerCodigo() {
    this.barcodeScanner.scan({ disableSuccessBeep: true, formats : 'QR_CODE', prompt : 'Ponga el código QR dentro del lector' })
    .then(barcodeData => {
      this.textoQR = barcodeData.text;
      // Envia los datos leidos del QR a la pagina crear preferencia.
      this.onReadDevice.emit(this.textoQR);
     }).catch(err => {
         console.log('Error', err);
     });
     return this.textoQR;
    /*this.barcodeScanner.scan(
      function(result) {
        this.textoQR = result.text;
      },
      function(error) {
          console.log("Hubo un error al escanear: " + error);
      }
      {
          prompt : "Place a barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
     );*/
    }
}
