import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'isAuthenticated';

  constructor() {
    // Al iniciar, verifica si la sesión está guardada
    const savedState = localStorage.getItem(this.AUTH_KEY);
    if (savedState) {
      this.isAuthenticated = JSON.parse(savedState);
    }
  }

  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Aquí puedes agregar lógica real de autenticación (por ejemplo, con un backend)
    if (username === 'admin' && password === '1234') {
      this.isAuthenticated = true;
      // Guarda el estado de autenticación en localStorage
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(this.isAuthenticated));
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    // Elimina el estado de autenticación de localStorage
    localStorage.removeItem(this.AUTH_KEY);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
