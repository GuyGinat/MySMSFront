import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-new-message',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-message.html',
  styleUrl: './new-message.css'
})
export class NewMessage {
  phoneNumber: string = '';
  messageContent: string = '';
  isSending: boolean = false;

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('NewMessage: Constructor called');
  }

  sendMessage() {
    if (!this.phoneNumber || !this.messageContent) {
      return;
    }

    console.log('NewMessage: Sending message...');
    this.isSending = true;
    this.cdr.detectChanges(); // Update the UI immediately
    
    this.messageService.sendMessage({
      to: this.phoneNumber,
      content: this.messageContent
    }).subscribe({
      next: (response) => {
        console.log('NewMessage: Message sent successfully:', response);
        this.clearForm();
        // Trigger refresh of message history
        this.messageService.refreshMessages();
      },
      error: (error) => {
        console.error('NewMessage: Error sending message:', error);
        alert('Failed to send message. Please try again.');
      },
      complete: () => {
        this.isSending = false;
        this.cdr.detectChanges(); // Update the UI after completion
      }
    });
  }

  clearForm() {
    console.log('NewMessage: Clearing form');
    this.phoneNumber = '';
    this.messageContent = '';
    this.cdr.detectChanges(); // Force update after clearing
  }

  // Add debugging for form interactions
  onPhoneNumberChange() {
    console.log('NewMessage: Phone number changed to:', this.phoneNumber);
    this.cdr.detectChanges();
  }

  onMessageContentChange() {
    console.log('NewMessage: Message content changed, length:', this.messageContent.length);
    this.cdr.detectChanges();
  }
}
