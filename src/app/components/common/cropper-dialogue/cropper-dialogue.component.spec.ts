import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperDialogueComponent } from './cropper-dialogue.component';

describe('CropperDialogueComponent', () => {
  let component: CropperDialogueComponent;
  let fixture: ComponentFixture<CropperDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropperDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropperDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
