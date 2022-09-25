import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogLoginFailComponent} from "./dialog-login-fail/dialog-login-fail.component";
import {DialogRegisterFailComponent} from "./dialog-register-fail/dialog-register-fail.component";
import {DialogRegisterSuccessComponent} from "./dialog-register-success/dialog-register-success.component";
import {DialogSuccessComponent} from './dialog-success/dialog-success.component';
import {DialogLoginSuccessComponent} from './dialog-login-success/dialog-login-success.component';
import {DialogFailComponent} from './dialog-fail/dialog-fail.component';
import {DialogLogOutComponent} from './dialog-log-out/dialog-log-out.component';
import {MaterialModule} from "../material/material.module";
import { DialogShowImageComponent } from './dialog-show-image/dialog-show-image.component';

const NotificationComponents = [
  DialogLoginFailComponent,
  DialogRegisterFailComponent,
  DialogRegisterSuccessComponent,
  DialogSuccessComponent,
  DialogLoginSuccessComponent,
  DialogFailComponent,
  DialogLogOutComponent,
]

@NgModule({
  declarations: [
    NotificationComponents,
    DialogShowImageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class NotificationsModule {
}
