import { NgModule } from '@angular/core';
import { MenusliderComponent} from './menuslider/menuslider.component';
import { EscanerComponent } from './escaner/escaner.component';
import { IonicModule } from '@ionic/angular';
import { PopoverEdificiosInicioComponent } from './popover-edificios-inicio/popover-edificios-inicio.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MenusliderComponent,
        EscanerComponent,
        PopoverEdificiosInicioComponent,
    ],
    exports: [
        MenusliderComponent,
        EscanerComponent,
        PopoverEdificiosInicioComponent,
    ],
    imports: [
        IonicModule,
        CommonModule
    ]
})
export class ComponentsModule { }