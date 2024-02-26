import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBlankComponent } from './chat-blank.component';

describe('ChatBlankComponent', () => {
  let component: ChatBlankComponent;
  let fixture: ComponentFixture<ChatBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
