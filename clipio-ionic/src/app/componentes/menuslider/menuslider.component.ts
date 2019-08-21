import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DataUserService } from '../../services/data-user.service';

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
  perfil: string;
  edificioActual = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private dataUserService: DataUserService,
  ) { }
  async ngOnInit() {
    this.perfil = this.dataUserService.getEmail();
  }

  pushPerfil() {
    this.router.navigate(['/perfil']);
  }
  pushEdificio() {
    this.router.navigate(['/edificio']);
  }
  pushInicio() {
    this.edificioActual = this.dataUserService.getEdificioActual();
    this.router.navigate(['/principal', this.edificioActual]);
  }
  pushPreferencia() {
    this.router.navigate(['/preferencias']);
  }
  pushCerrarSesion() {
    this.authService.logout();
  }

}
