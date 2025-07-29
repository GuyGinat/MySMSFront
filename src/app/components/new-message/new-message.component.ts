import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">New Message</h5>
      </div>
      <div class="card-body">
        <form (ngSubmit)="sendMessage()" #messageForm="ngForm">
          <div class="mb-3">
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <input 
              type="tel" 
              class="form-control" 
              id="phoneNumber"
              name="phoneNumber"
              [(ngModel)]="phoneNumber"
              placeholder="Enter phone number"
              required>
          </div>
          
          <div class="mb-3">
            <label for="messageContent" class="form-label">Message</label>
            <textarea 
              class="form-control" 
              id="messageContent"
              name="messageContent"
              [(ngModel)]="messageContent"
              rows="4"
              placeholder="Enter your message"
              maxlength="250"
              required></textarea>
            <div class="form-text text-end">
              {{ messageContent.length }}/250
            </div>
          </div>
          
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-link" (click)="clearForm()">Clear</button>
            <button type="submit" class="btn btn-dark" [disabled]="!messageForm.valid || isSending">
              {{ isSending ? 'Sending...' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .card {
      height: 100%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .btn-link {
      text-decoration: none;
      color: #6c757d;
    }
    
    .btn-link:hover {
      color: #495057;
    }
  `]
})
export class NewMessageComponent {
  phoneNumber: string = '';
  messageContent: string = '';
  isSending: boolean = false;

  constructor(private messageService: MessageService) {}

  sendMessage() {
    if (!this.phoneNumber || !this.messageContent) {
      return;
    }

    this.isSending = true;
    
    this.messageService.sendMessage({
      to: this.phoneNumber,
      content: this.messageContent
    }).subscribe({
      next: (response) => {
        console.log('Message sent successfully:', response);
        this.clearForm();
        // Trigger refresh of message history
        this.messageService.refreshMessages();
      },
      error: (error) => {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      },
      complete: () => {
        this.isSending = false;
      }
    });
  }

  clearForm() {
    this.phoneNumber = '';
    this.messageContent = '';
  }
} 