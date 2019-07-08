import { NgModule } from '@angular/core';
import { MenusliderComponent} from './menuslider/menuslider.component';
import {IonicModule} from '@ionic/angular';
@NgModule({
    declarations:[MenusliderComponent],
    exports:[MenusliderComponent],
    imports: [IonicModule]
})
export class ComponentsModule{}