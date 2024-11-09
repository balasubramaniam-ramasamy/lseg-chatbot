import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ChatMenuComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [ChatMenuComponent],

})
export class AppModule { }
