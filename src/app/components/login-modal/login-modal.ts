import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.html',
  styleUrl: './login-modal.css'
})
export class LoginModal {
  @Output() loginSuccess = new EventEmitter<User>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible: boolean = true;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string = '';

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService) {}

  closeModal() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    if (!this.isLoginMode && this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isLoginMode) {
      // Login
      this.authService.login({
        email: this.email,
        password: this.password
      }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.authService.setUser(response.user);
          this.loginSuccess.emit(response.user);
          this.closeModal();
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage = error.error?.error || 'Login failed. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      // Register
      this.authService.register({
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword
      }).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.authService.setUser(response.user);
          this.loginSuccess.emit(response.user);
          this.closeModal();
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error?.errors?.join(', ') || 'Registration failed. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }
}
