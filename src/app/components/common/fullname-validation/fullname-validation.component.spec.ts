import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullnameValidationComponent } from './fullname-validation.component';

describe('FullnameValidationComponent', () => {
  let component: FullnameValidationComponent;
  let fixture: ComponentFixture<FullnameValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullnameValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullnameValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
