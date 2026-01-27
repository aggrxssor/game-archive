import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  authError: string | null = null;
  validationError: string | null = null;
  flashError = false;

  email = '';
  password = '';

  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login(): void {
    this.validationError = null;
    this.authError = null;

    if (!this.email.trim() || !this.password.trim()) {
      this.triggerValidationError('Email and password required');
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        this.auth.handleAuth(res);

        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/home';

        this.router.navigateByUrl(returnUrl);
      },
      error: () => {
        this.triggerAuthError('Incorrect email or password');
      }
    });
  }

  private triggerValidationError(message: string): void {
    this.validationError = message;
    this.flashError = true;

    setTimeout(() => {
      this.flashError = false;
    }, 500);
  }

  private triggerAuthError(message: string): void {
    this.authError = message;
    this.flashError = true;

    setTimeout(() => {
      this.flashError = false;
    }, 500);
  }
}
