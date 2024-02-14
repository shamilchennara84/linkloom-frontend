import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSecondProfileJsComponent } from './user-second-profile.js.component';

describe('UserSecondProfileJsComponent', () => {
  let component: UserSecondProfileJsComponent;
  let fixture: ComponentFixture<UserSecondProfileJsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSecondProfileJsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSecondProfileJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
