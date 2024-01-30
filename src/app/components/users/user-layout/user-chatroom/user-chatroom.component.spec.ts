import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatroomComponent } from './user-chatroom.component';

describe('UserChatroomComponent', () => {
  let component: UserChatroomComponent;
  let fixture: ComponentFixture<UserChatroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChatroomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
