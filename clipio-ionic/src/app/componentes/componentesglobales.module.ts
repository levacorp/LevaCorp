import { NgModule } from '@angular/core';
import { MenusliderComponent} from './menuslider/menuslider.component';
import { EscanerComponent } from './escaner/escaner.component';
import { LecturaQrComponent } from './lectura-qr/lectura-qr.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MenusliderComponent,
        EscanerComponent,
        LecturaQrComponent,
    ],
    exports: [
        MenusliderComponent,
        EscanerComponent,
        LecturaQrComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class ComponentsModule {}
