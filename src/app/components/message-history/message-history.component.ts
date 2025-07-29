import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';

interface Message {
  _id: string;
  to: string;
  content: string;
  status: string;
  created_at: string;
  sent_at?: string;
  error_message?: string;
}

@Component({
  selector: 'app-message-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">Message History ({{ messages.length }})</h5>
      </div>
      <div class="card-body" style="max-height: 500px; overflow-y: auto;">
        <div *ngIf="messages.length === 0" class="text-center text-muted py-4">
          No messages sent yet
        </div>
        
        <div *ngFor="let message of messages" class="message-item mb-3">
          <div class="d-flex justify-content-between align-items-start">
            <div class="phone-number">{{ message.to }}</div>
            <div class="timestamp">{{ formatDate(message.created_at) }}</div>
          </div>
          
          <div class="message-bubble mt-2">
            {{ message.content }}
          </div>
          
          <div class="message-footer mt-2">
            <span class="character-count">{{ message.content.length }}/250</span>
            <span class="status-badge ms-2" [class]="getStatusClass(message.status)">
              {{ message.status }}
            </span>
          </div>
          
          <div *ngIf="message.error_message" class="error-message mt-1">
            <small class="text-danger">{{ message.error_message }}</small>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      height: 100%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .message-item {
      border-bottom: 1px solid #eee;
      padding-bottom: 15px;
    }
    
    .message-item:last-child {
      border-bottom: none;
    }
    
    .phone-number {
      font-weight: 600;
      color: #333;
    }
    
    .timestamp {
      font-size: 0.8rem;
      color: #666;
    }
    
    .message-bubble {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 15px;
      padding: 10px 15px;
      word-wrap: break-word;
    }
    
    .message-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .character-count {
      font-size: 0.8rem;
      color: #666;
    }
    
    .status-badge {
      font-size: 0.7rem;
      padding: 2px 8px;
      border-radius: 10px;
      font-weight: 500;
    }
    
    .status-delivered {
      background-color: #d4edda;
      color: #155724;
    }
    
    .status-sent {
      background-color: #cce5ff;
      color: #004085;
    }
    
    .status-failed {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .status-pending {
      background-color: #fff3cd;
      color: #856404;
    }
  `]
})
export class MessageHistoryComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.loadMessages();
    
    // Subscribe to message refresh events
    this.messageService.messagesUpdated$.subscribe(() => {
      this.loadMessages();
    });
  }

  loadMessages() {
    this.messageService.getMessages().subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: '2-digit',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'sent':
        return 'status-sent';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  }
} 