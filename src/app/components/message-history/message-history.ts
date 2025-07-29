import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, MessageResponse } from '../../services/message.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-message-history',
  imports: [CommonModule],
  templateUrl: './message-history.html',
  styleUrl: './message-history.css'
})
export class MessageHistory implements OnInit, OnDestroy {
  messages: MessageResponse[] = [];
  private subscription: Subscription = new Subscription();
  private autoRefreshSubscription: Subscription = new Subscription();

  constructor(
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('MessageHistory: Constructor called');
  }

  ngOnInit() {
    console.log('MessageHistory: ngOnInit called');
    this.loadMessages();

    // Subscribe to message refresh events
    this.subscription.add(
      this.messageService.messagesUpdated$.subscribe(() => {
        console.log('MessageHistory: Received refresh signal');
        this.loadMessages();
      })
    );

    // Auto-refresh every 10 seconds to check for webhook updates
    this.autoRefreshSubscription = interval(10000).subscribe(() => {
      console.log('MessageHistory: Auto-refreshing messages');
      this.loadMessages();
    });
  }

  ngOnDestroy() {
    console.log('MessageHistory: ngOnDestroy called');
    this.subscription.unsubscribe();
    this.autoRefreshSubscription.unsubscribe();
  }

  loadMessages() {
    console.log('MessageHistory: loadMessages called');
    this.messageService.getMessages().subscribe({
      next: (messages) => {
        console.log('MessageHistory: Received messages:', messages);
        console.log('MessageHistory: Messages count:', messages.length);
        this.messages = messages;
        // Force change detection
        this.cdr.detectChanges();
        console.log('MessageHistory: Change detection triggered');
      },
      error: (error) => {
        console.error('MessageHistory: Error loading messages:', error);
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
      case 'queued':
        return 'status-queued';
      case 'failed':
        return 'status-failed';
      case 'undelivered':
        return 'status-failed';
      case 'pending':
      default:
        return 'status-pending';
    }
  }

  getStatusDisplayName(status: string): string {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'Delivered ✓';
      case 'sent':
        return 'Sent';
      case 'queued':
        return 'Queued';
      case 'failed':
        return 'Failed';
      case 'undelivered':
        return 'Undelivered';
      case 'pending':
      default:
        return 'Pending';
    }
  }
}
