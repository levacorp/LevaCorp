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
    imports: [
        IonicModule,
    ]
})
export class ComponentsModule{}