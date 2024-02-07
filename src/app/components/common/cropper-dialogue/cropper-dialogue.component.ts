
import { CommonModule } from '@angular/common';
import { Component, type OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageCropperModule, type ImageCroppedEvent } from 'ngx-image-cropper';

export interface CropperDialogueData {
  image: File;
  width: number;
  hieght: number;
}

export interface CropperDialogueResult {
  blob: Blob;
  imageUrl: string;
}

@Component({
  selector: 'app-cropper-dialogue',
  standalone: true,
  imports: [CommonModule, ImageCropperModule, MatToolbarModule, MatDialogModule],
  templateUrl: './cropper-dialogue.component.html',
  styleUrl: './cropper-dialogue.component.css',
})
export class CropperDialogueComponent implements OnInit {
  
  data: CropperDialogueData = inject(MAT_DIALOG_DATA);
  result = signal<CropperDialogueResult | undefined>(undefined);
  ngOnInit(): void {
    console.log(this.data, 'data from cropped dialogue');
  }

  imageCropped(event: ImageCroppedEvent): void {
    const { blob, objectUrl } = event;
    console.log(blob, 'blob from imageCropped');
    console.log(objectUrl, 'objectUrl from imageCropped');

    if (blob != null && objectUrl != null) {
      this.result.set({ blob, imageUrl: objectUrl });
    }
  }

  





}
