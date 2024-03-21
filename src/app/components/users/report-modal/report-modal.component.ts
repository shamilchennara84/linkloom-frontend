import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [MatDialogModule, CommonModule, FormsModule, MatFormField],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.css',
})
export class ReportModalComponent implements OnInit {
  @Input() userId!: string; // Add this line
  @Input() postId!: string; // Add this line

  reportReason = '';

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
    this.userService.postReport(this.userId, this.postId, this.reportReason).subscribe(
      (response) => {
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error submitting report:', error);
      }
    );
  }
}
