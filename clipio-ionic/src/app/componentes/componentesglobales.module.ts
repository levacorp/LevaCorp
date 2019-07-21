import { NgModule } from '@angular/core';
<<<<<<< HEAD
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
=======
import { MenusliderComponent} from './menuslider/menuslider.component';
<<<<<<< HEAD
import {IonicModule} from '@ionic/angular';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations:[MenusliderComponent],
    exports:[MenusliderComponent],
    imports: [
        IonicModule,
        CommonModule,
    ]
=======
import { EscanerComponent } from './escaner/escaner.component';
import { IonicModule } from '@ionic/angular';
@NgModule({
    declarations: [
        MenusliderComponent,
        EscanerComponent,
    ],
    exports: [
        MenusliderComponent,
        EscanerComponent,
    ],
    imports: [IonicModule]
>>>>>>> bb08a0abb600e1843624000c078a2fc9fd178422
>>>>>>> 47eb0d2e6be32ad98a29d60360c2b5a444aff34c
})
export class ComponentsModule{}