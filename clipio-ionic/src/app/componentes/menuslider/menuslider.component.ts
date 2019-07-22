import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
import { Router } from '@angular/router';
import { EscanerComponent } from '../escaner/escaner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class AppRoutingModule { }
@Component({
  selector: 'app-menuslider',
  templateUrl: './menuslider.component.html',
  styleUrls: ['./menuslider.component.scss'],
})
export class MenusliderComponent implements OnInit {

  constructor(private menu: MenuController, private barcodeScanner: BarcodeScanner, private router: Router) { }
  ngOnInit() { }

  pushEdificio(){
    this.router.navigate(['/edificio']);
  }
  pushInicio() {
    this.router.navigate(['/principal']);
  }
  pushPreferencia(){
      this.router.navigate(['/preferencias']);
  }
}
