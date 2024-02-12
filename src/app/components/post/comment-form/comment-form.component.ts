import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'


@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent implements OnInit {
  @Input() submitLabel!: string;
  @Input() hasCancelButton: boolean = false;
  @Input() initialText: string = '';


  @Output() handleSubmit = new EventEmitter();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [this.initialText, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.handleSubmit.emit(this.form.value);
  }
}
