import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  login(username: string, password: string): boolean {
    // Aquí puedes agregar lógica real de autenticación (por ejemplo, con un backend)
    if (username === 'admin' && password === '1234') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
