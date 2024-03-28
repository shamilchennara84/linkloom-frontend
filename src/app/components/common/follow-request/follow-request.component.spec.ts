import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowRequestComponent } from './follow-request.component';

describe('FollowRequestComponent', () => {
  let component: FollowRequestComponent;
  let fixture: ComponentFixture<FollowRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
