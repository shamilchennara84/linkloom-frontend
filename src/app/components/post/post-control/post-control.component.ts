import { Component, EventEmitter, Input, Output, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  CropperDialogueComponent,
  CropperDialogueResult,
} from '../../common/cropper-dialogue/cropper-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post-control',
  standalone: true,
  imports: [MatButtonModule, MatIcon, CropperDialogueComponent, NgOptimizedImage],
  templateUrl: './post-control.component.html',
  styleUrl: './post-control.component.css',
})
export class PostControlComponent {
  imageWidth = signal(0);
  @Input() set width(val: number) {
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  @Input() set height(val: number) {
    this.imageHeight.set(val);
  }

  croppedImage = signal<CropperDialogueResult | undefined>(undefined);
  dialog = inject(MatDialog);

  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}/FFFFFF/5B7C99?text=Upload+Image`
  );

  imageSource = computed(() => {
    if (this.croppedImage()) {
      return this.croppedImage()?.imageUrl || '';
    } else {
      return this.placeholder();
    }
  });

  fileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const dialogRef = this.dialog.open(CropperDialogueComponent, {
        data: { image: file, width: this.imageWidth(), height: this.imageHeight() },
        width: '500px',
      });

      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result) => this.croppedImage.set(result));
    }
  }

  @Output()
  imageReady = new EventEmitter<Blob>();

  constructor() {
    effect(() => {
      if (this.croppedImage()) {
        this.imageReady.emit(this.croppedImage()?.blob);
      }
    });
  }
}
