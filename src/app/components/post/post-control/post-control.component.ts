import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  CropperDialogueComponent,
  CropperDialogueResult,
} from '../../common/cropper-dialogue/cropper-dialogue.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-control',
  standalone: true,
  imports: [MatButtonModule, MatIcon, CropperDialogueComponent, NgOptimizedImage],
  templateUrl: './post-control.component.html',
  styleUrl: './post-control.component.css',
})
export class PostControlComponent implements OnInit, OnDestroy {
  imageWidth = signal(0);
  imageHeight = signal(0);
  croppedImage = signal<CropperDialogueResult | undefined>(undefined);
  dialog = inject(MatDialog);
  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}/FFFFFF/5B7C99?text=Upload+Image`
  );
  imageSource = computed(() => this.croppedImage()?.imageUrl || this.placeholder());
  @Output() imageReady = new EventEmitter<Blob>();
  private subscription!: Subscription;

  constructor() {}

  ngOnInit() {
    effect(() => {
      if (this.croppedImage()) {
        this.imageReady.emit(this.croppedImage()?.blob);
      }
    });
  }

  fileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        const dialogRef = this.dialog.open(CropperDialogueComponent, {
          data: { image: file, width: this.imageWidth(), height: this.imageHeight() },
          width: '500px',
        });

        this.subscription = dialogRef
          .afterClosed()
          .pipe(filter((result) => !!result))
          .subscribe((result) => this.croppedImage.set(result));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please select an image file.',
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}