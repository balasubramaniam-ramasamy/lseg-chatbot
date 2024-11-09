import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})

export class AppComponent implements OnChanges {
  public welcomeMessage = "Hello! Welcome to LSEG. I'm here to help you."
  public title = 'LSEG Chatbot';

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges')
  }
}
