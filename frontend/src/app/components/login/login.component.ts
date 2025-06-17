import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.senha).subscribe({
      next: () => {
        this.authService.setLoggedIn(true);
        this.router.navigate(['/autores']); // Ou para onde quiser após login
      },
      error: () => {
        this.erro = 'E-mail ou senha inválidos!';
      }
    });
  }
}
