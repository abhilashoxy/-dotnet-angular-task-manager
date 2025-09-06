import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgIf } from '@angular/common';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
})
export class MyProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private profileService: ProfileService
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileService.getProfile().subscribe({
      next: (user) => this.profileForm.patchValue(user),
      error: () => alert('Failed to load profile')
    });
  }

  save() {
    if (this.profileForm.invalid) return;

    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => alert('Profile updated successfully'),
      error: () => alert('Update failed')
    });
  }
}
