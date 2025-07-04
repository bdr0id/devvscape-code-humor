import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventsPageRoutingModule } from './events-routing.module';
import { TranslocoModule } from '@jsverse/transloco';

import { EventsPage } from './events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventsPageRoutingModule,
    TranslocoModule,
  ],
  declarations: [EventsPage],
})
export class EventsPageModule {}
