import { NgModule } from '@angular/core';
import { MenusliderComponent} from './menuslider/menuslider.component';
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
<<<<<<< HEAD
    imports: [
        IonicModule,
    ]
=======
    imports: [IonicModule]

>>>>>>> 5c995d6f42400558e90b320caee814c7b8a1f7fe
})
export class ComponentsModule { }