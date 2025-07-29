import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMessage } from '../new-message/new-message';
import { MessageHistory } from '../message-history/message-history';
import { LoginModal } from '../login-modal/login-modal';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NewMessage, MessageHistory, LoginModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  isAuthenticated: boolean = false;
  showLoginModal: boolean = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Check if user is already logged in
    const user = this.authService.getUser();
    if (user) {
      this.currentUser = user;
      this.isAuthenticated = true;
      this.showLoginModal = false;
      console.log('User already logged in:', user);
    } else {
      this.showLoginModal = true;
    }
  }

  onLoginSuccess(userData: User) {
    this.currentUser = userData;
    this.isAuthenticated = true;
    this.showLoginModal = false;
    console.log('User logged in:', userData);
  }

  onModalClosed() {
    // If user closes modal without logging in, keep it open
    if (!this.isAuthenticated) {
      this.showLoginModal = true;
    }
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.isAuthenticated = false;
    this.showLoginModal = true;
  }
}
