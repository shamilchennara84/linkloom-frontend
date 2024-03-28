import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, computed, effect, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter, Subject, takeUntil } from 'rxjs';
import { CropperDialogueComponent, type CropperDialogueResult } from '../cropper-dialogue/cropper-dialogue.component';

@Component({
  selector: 'app-profile-dp',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './profile-dp.component.html',
  styleUrl: './profile-dp.component.css',
})
export class ProfileDpComponent implements OnDestroy{
  imageWidth = signal(0);
  @Input() set width(val: number) {
    this.imageWidth.set(val);
  }
  @Input() set height(val: number) {
    this.imageHeight.set(val);
  }
  @Output() imageReady = new EventEmitter<Blob>();
  @Output() deleteDp = new EventEmitter();
  imageHeight = signal(0);
  @Input() currDp: string = '';

  croppedImage = signal<CropperDialogueResult | undefined>(undefined);
  placeholder = computed(() => 'assets/placeholder/profile.png');

  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      if (this.croppedImage() !== undefined) {
        this.imageReady.emit(this.croppedImage()?.blob);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  imageSource(): string {
    return this.currDp ? this.currDp : this.placeholder();
  }

  dialog = inject(MatDialog);

  fileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const dialogRef = this.dialog.open(CropperDialogueComponent, {
        data: { image: file, width: this.imageWidth(), height: this.imageHeight() },
        width: '500px',
      });

      dialogRef
        .afterClosed()
        .pipe(
          filter((result) => !!result),
          takeUntil(this.destroy$) // Unsubscribe when the component is destroyed
        )
        .subscribe((result) => {
          this.croppedImage.set(result);
        });
    }
  }

  deleteProfilePic(): void {
    this.croppedImage.set(undefined);
    this.deleteDp.emit();
    this.currDp = '';
  }
}
