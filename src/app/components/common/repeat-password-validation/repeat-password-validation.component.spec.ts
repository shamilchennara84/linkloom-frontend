import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatPasswordValidationComponent } from './repeat-password-validation.component';

describe('RepeatPasswordValidationComponent', () => {
  let component: RepeatPasswordValidationComponent;
  let fixture: ComponentFixture<RepeatPasswordValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepeatPasswordValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepeatPasswordValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
