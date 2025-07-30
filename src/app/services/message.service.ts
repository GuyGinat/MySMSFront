import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  to: string;
  content: string;
}

export interface MessageResponse {
  _id: string;
  to: string;
  content: string;
  status: string;
  created_at: string;
  sent_at?: string;
  error_message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = environment.API_URL;
  private messagesUpdatedSubject = new Subject<void>();
  public messagesUpdated$ = this.messagesUpdatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  sendMessage(message: Message): Observable<MessageResponse> {
    console.log('MessageService: Sending message:', message);
    return this.http.post<MessageResponse>(`${this.apiUrl}/messages`, {
      message: message
    }, { withCredentials: true });
  }

  getMessages(): Observable<MessageResponse[]> {
    console.log('MessageService: Getting messages...');
    return this.http.get<MessageResponse[]>(`${this.apiUrl}/messages`, { withCredentials: true });
  }

  refreshMessages(): void {
    console.log('MessageService: Refreshing messages...');
    this.messagesUpdatedSubject.next();
  }
} 