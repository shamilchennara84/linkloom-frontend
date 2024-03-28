import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowerListRowComponent } from './follower-list-row.component';

describe('FollowerListRowComponent', () => {
  let component: FollowerListRowComponent;
  let fixture: ComponentFixture<FollowerListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowerListRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowerListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
