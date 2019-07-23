import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edificio',
  templateUrl: './edificio.page.html',
  styleUrls: ['./edificio.page.scss'],
})
export class EdificioPage implements OnInit {
 
  edificios: Observable<any>;
  constructor(private dataservice: DataService,private router: Router) { }

  ngOnInit() {
    this.edificios= this.dataservice.getEdificios();
  }
  pushCrearEdificio(){
    this.router.navigate(['/crear-edificio']);
  }

}
