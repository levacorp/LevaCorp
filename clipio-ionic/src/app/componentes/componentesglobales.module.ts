import { NgModule } from '@angular/core';
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
})
export class ComponentsModule{}