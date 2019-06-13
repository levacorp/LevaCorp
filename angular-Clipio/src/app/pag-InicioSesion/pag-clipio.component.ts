import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pag-clipio',
  templateUrl: './pag-clipio.component.html',
  styleUrls: ['./pag-clipio.component.css']
})
export class PagClipioComponent implements OnInit {

  inicioForm:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  

  ngOnInit() {
    this.inicioForm=this.formBuilder.group({
      usuario:['',Validators.required],
      contraseña:['',Validators.required]
    });
      
  }

  iniciarUsuario(){
    console.warn(this.inicioForm.value);
    alert(this.inicioForm);
  }
}
