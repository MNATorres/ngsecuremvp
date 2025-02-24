import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  errorMessage: string = '';

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = '* Por favor, completa todos los campos.';
      return;
    }

    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    this.authService.login(username, password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (error) => console.error('Error al iniciar sesión', error),
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
