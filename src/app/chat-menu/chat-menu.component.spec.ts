import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMenuComponent } from './chat-menu.component';

describe('ChatMenuComponent', () => {
  let component: ChatMenuComponent;
  let fixture: ComponentFixture<ChatMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
