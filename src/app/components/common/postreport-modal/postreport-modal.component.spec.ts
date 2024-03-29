import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostreportModalComponent } from './postreport-modal.component';

describe('PostreportModalComponent', () => {
  let component: PostreportModalComponent;
  let fixture: ComponentFixture<PostreportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostreportModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostreportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
