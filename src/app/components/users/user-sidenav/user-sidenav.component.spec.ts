import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavComponent } from './UserSidenavComponent';

describe('UserSidenavComponent', () => {
  let component: UserSidenavComponent;
  let fixture: ComponentFixture<UserSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
