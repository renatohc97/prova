import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string) {
    return this.http.post(this.apiUrl, { email, senha }, { responseType: 'text' });
  }

 isLoggedIn(): boolean {
  return typeof localStorage !== 'undefined' && !!localStorage.getItem('logado');
}

  setLoggedIn(logado: boolean) {
    if (logado) {
      localStorage.setItem('logado', 'true');
    } else {
      localStorage.removeItem('logado');
    }
  }

  logout() {
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }
}
