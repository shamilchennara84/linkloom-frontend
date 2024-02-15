import { Component, EventEmitter, Input, OnInit, Output, computed, effect, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { CropperDialogueComponent, type CropperDialogueResult } from '../cropper-dialogue/cropper-dialogue.component';

@Component({
  selector: 'app-profile-dp',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './profile-dp.component.html',
  styleUrl: './profile-dp.component.css',
})
export class ProfileDpComponent implements OnInit {
  imageWidth = signal(0);
  // eslint-disable-next-line accessor-pairs
  @Input() set width(val: number) {
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  // eslint-disable-next-line accessor-pairs
  @Input() set height(val: number) {
    this.imageHeight.set(val);
  }
  @Input() currDp: string = '';

  croppedImage = signal<CropperDialogueResult | undefined>(undefined);

  placeholder = computed(() => 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200');

  // imageSource = computed(() => {
  //   console.log(this.croppedImage(), 'croppedImage() returns this in imageSurce');
  //   return this.croppedImage()?.imageUrl ?? this.placeholder();
  // });
  imageSource(): string {
    return this.currDp ? this.currDp : this.placeholder();
  }

  ngOnInit(): void {
   
  }

  dialog = inject(MatDialog);

  fileSelected(event: any): void {
    const file = event.target.files[0];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (file) {
      const dialogRef = this.dialog.open(CropperDialogueComponent, {
        data: { image: file, width: this.imageWidth(), height: this.imageHeight() },
        width: '500px',
      });

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      dialogRef
        .afterClosed()
        .pipe(filter((result) => !!result))
        .subscribe((result) => {
          this.croppedImage.set(result);
        });
    }
  }

  @Output() imageReady = new EventEmitter<Blob>();

  constructor() {
    effect(() => {
      if (this.croppedImage() !== undefined) {
        this.imageReady.emit(this.croppedImage()?.blob);
      }
    });
  }

  @Output() deleteDp = new EventEmitter();

  deleteProfilePic(): void {
    this.croppedImage.set(undefined);
    this.deleteDp.emit();
    this.currDp = '';
  }
}
