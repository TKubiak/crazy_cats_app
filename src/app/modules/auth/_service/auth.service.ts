import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Error {
  code: string;
  message: string;
  event?: string;
}

export interface User {
  email: string;
  password: string;
  showPassword: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {
  }

  public signIn(): void {
    localStorage.setItem('loggedIn', 'true');
    this.router.navigate(['/']);
  }

  public signOut(): void {
    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  }
}
