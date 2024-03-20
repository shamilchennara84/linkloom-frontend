import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FollowButtonComponent } from '../../common/follow-button/follow-button.component';
import { IUserRes } from '../../../core/models/interfaces/users';

@Component({
  selector: 'app-follower-list',
  standalone: true,
  imports: [CommonModule, FollowButtonComponent],
  templateUrl: './follower-list.component.html',
  styleUrl: './follower-list.component.css',
})
export class FollowerListComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  users: IUserRes[] = [];
  ngOnInit(): void {
    
  }
}
