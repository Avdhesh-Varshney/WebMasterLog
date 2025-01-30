import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatListComponent } from './chat-box/chat-list/chat-list.component';
import { ChatHeaderComponent } from './chat-box/chat-header/chat-header.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ChatBoxComponent,
    ChatListComponent,
    ChatHeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class FeaturesModule { }
