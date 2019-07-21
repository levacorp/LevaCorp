import { NgModule } from '@angular/core';
import { MenusliderComponent } from './menuslider/menuslider.component';
import {IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        MenusliderComponent,
    ],
    exports:[
        MenusliderComponent,
    ],
    imports:[
        CommonModule,
        IonicModule
    ]
})
export class ComponentsModule{}