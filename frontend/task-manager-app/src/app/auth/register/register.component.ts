import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Add this

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
       username: ['', Validators.required],
  address: ['']
    });
  }

  onRegister() {
    if (this.registerForm?.invalid || this.registerForm?.value.password !== this.registerForm?.value.confirmPassword) {
      this.errorMessage = "Passwords do not match or form is invalid.";
      this.successMessage = null;
      return;
    }

    this.authService.register(this.registerForm?.value).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed.';
        this.successMessage = null;
      }
    });
  }
}