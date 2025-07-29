import { Component } from '@angular/core';
import { NewMessage } from '../new-message/new-message';
import { MessageHistory } from '../message-history/message-history';

@Component({
  selector: 'app-dashboard',
  imports: [NewMessage, MessageHistory],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
