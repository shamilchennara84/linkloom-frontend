import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPostComponent } from './img-post.component';

describe('ImgPostComponent', () => {
  let component: ImgPostComponent;
  let fixture: ComponentFixture<ImgPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
