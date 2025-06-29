import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Add this

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm?.invalid) return;

    this.authService.login(this.loginForm?.value).subscribe({
      next: (res) => {
        this.successMessage = 'Login successful!';
        this.errorMessage = null;

        // Save token and navigate to tasks
        localStorage.setItem('token', res.token);
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        this.successMessage = null;
      }
    });
  }
}
