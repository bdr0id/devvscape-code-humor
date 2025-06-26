import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthModule } from '../../auth.module';

@NgModule({
  declarations: [ResetPasswordPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    AuthModule,
    TranslocoModule,
  ],
})
export class ResetPasswordPageModule {}
