import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<AuthResponse> {
    console.log('AuthService: Registering user:', request);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, {
      user: request
    }, { withCredentials: true });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    console.log('AuthService: Logging in user:', request);
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, request, { withCredentials: true });
  }

  // Store user data in localStorage
  setUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Get user data from localStorage
  getUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // Clear user data (logout)
  logout(): void {
    localStorage.removeItem('currentUser');
  }
} 