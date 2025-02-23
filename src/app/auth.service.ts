import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private accessTokenKey = 'access_token';
  private emailKey = 'user_email';

  constructor() { }

  // Save user data (JWT + Email)
  saveUserData(token: string, email: string) {
    sessionStorage.setItem(this.accessTokenKey, token);
    sessionStorage.setItem(this.emailKey, email);
  }

  // Get access token
  getAccessToken(): string | null {
    return sessionStorage.getItem(this.accessTokenKey);
  }

  // Get email
  getEmail(): string | null {
    return sessionStorage.getItem(this.emailKey);
  }

  // Remove user data (on logout)
  clearUserData() {
    sessionStorage.removeItem(this.accessTokenKey);
    sessionStorage.removeItem(this.emailKey);
  }

  // Check if user is logged in
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
