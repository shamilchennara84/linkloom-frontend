import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDpComponent } from './profile-dp.component';

describe('ProfileDpComponent', () => {
  let component: ProfileDpComponent;
  let fixture: ComponentFixture<ProfileDpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
