import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeProfileComponent } from './user-home-profile.component';

describe('UserHomeProfileComponent', () => {
  let component: UserHomeProfileComponent;
  let fixture: ComponentFixture<UserHomeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserHomeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
