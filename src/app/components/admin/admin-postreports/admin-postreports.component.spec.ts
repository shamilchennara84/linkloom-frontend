import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostreportsComponent } from './admin-postreports.component';

describe('AdminPostreportsComponent', () => {
  let component: AdminPostreportsComponent;
  let fixture: ComponentFixture<AdminPostreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPostreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPostreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
