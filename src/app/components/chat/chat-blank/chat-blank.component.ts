import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-blank',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './chat-blank.component.html',
  styleUrl: './chat-blank.component.css',
})
export class ChatBlankComponent {
  faEnvelope = faEnvelope;
}
