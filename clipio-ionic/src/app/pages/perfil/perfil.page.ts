import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroupName, Validators, FormGroup,FormControl} from '@angular/forms';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfil: any[];
  myform: FormGroup;
  constructor(
    private dataservice: DataService,
    public formBuilder: FormBuilder,
    public navCtrl: NavController
  ) {
    this.myform = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      celular: ['', Validators.required, Validators.minLength(10), Validators.pattern('[a-zA-Z]*')],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: '',
      lugarNacimiento: '',
      facebook: ''
    });
    
  }

  ngOnInit() {
    this.perfil = this.dataservice.getPerfilUsuario();
    console.log(this.perfil);

    //console.log(getDatosActuales);

  }
  saveData() {
    if (this.myform.valid){
    this.dataservice.setXMLPerfil(this.myform);
    console.log(this.myform.value);
    }
    
  }
 
}
