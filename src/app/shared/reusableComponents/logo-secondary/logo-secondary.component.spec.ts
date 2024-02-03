import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSecondaryComponent } from './logo-secondary.component';

describe('LogoSecondaryComponent', () => {
  let component: LogoSecondaryComponent;
  let fixture: ComponentFixture<LogoSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoSecondaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
