import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PlacesPage } from './places.page';
import {PlacesRoutingModule} from './places-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PlacesRoutingModule,
    IonicModule
  ],
  declarations: [PlacesPage]
})
export class PlacesPageModule {}
