import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { EscanerComponent } from '../escaner/escaner.component';

@Component({
  selector: 'app-menuslider',
  templateUrl: './menuslider.component.html',
  styleUrls: ['./menuslider.component.scss'],
})
export class MenusliderComponent implements OnInit {

  constructor(private menu: MenuController) { }
  ngOnInit() {}

}
