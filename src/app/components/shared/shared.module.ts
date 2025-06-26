import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ErrorBannerComponent } from './components/error-banner/error-banner.component';
import { LazyImgDirective } from 'src/app/core/directives/lazy-img.directive';
import { DateAgoPipe } from 'src/app/core/pipes/date-ago.pipe';

@NgModule({
  declarations: [DateAgoPipe, LazyImgDirective,ErrorBannerComponent,],
  imports: [CommonModule,IonicModule,],
  exports: [DateAgoPipe, LazyImgDirective,ErrorBannerComponent,],
})
export class SharedModule { } 