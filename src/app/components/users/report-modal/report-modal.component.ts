import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { UserService } from '../../../core/services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, MatFormField],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.css',
})
export class ReportModalComponent implements OnInit,OnDestroy {
  @Input() userId!: string; 
  @Input() postId!: string; 
  reportReason = '';
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string; postId: string },
    public dialogRef: MatDialogRef<ReportModalComponent>
  ) {}

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.postId = this.data.postId;
  }

  submitReport() {
    this.userService
      .postReport(this.userId, this.postId, this.reportReason)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Report submitted successfully:', response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error submitting report:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
