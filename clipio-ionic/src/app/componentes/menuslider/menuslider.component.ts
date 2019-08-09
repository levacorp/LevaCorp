import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BarcodeScannerOptions, BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'
import { Router } from '@angular/router';
import { EscanerComponent } from '../escaner/escaner.component';
import { AuthenticationService } from '../../services/authentication.service';
import { DataService } from 'src/app/services/data.service';

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
  perfil: any[];
  constructor(
    private menu: MenuController,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private authService: AuthenticationService,
    private dataservice: DataService
  ) { }
  async ngOnInit() {
  }

  pushPerfil() {
    this.router.navigate(['/perfil']);
  }
  pushEdificio() {
    this.router.navigate(['/edificio']);
  }
  pushInicio() {
    this.router.navigate(['/principal']);
  }
  pushPreferencia() {
    this.router.navigate(['/preferencias']);
  }
  pushCerrarSesion() {
    this.authService.logout();
    //this.router.navigate(['/inicio-sesion']);
  }

}
