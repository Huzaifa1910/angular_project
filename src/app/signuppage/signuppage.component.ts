import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BackendApisService } from '../backend-apis.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signuppage',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  providers: [
    BackendApisService
  ],
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent {
  constructor(private router: Router, private backendApisService: BackendApisService) {
    console.log('Signup page loaded');
  }
  isLoading = false;
  login() {
    console.log('login clicked');
    this.router.navigate(['/login']);
  }

  register(form: any) {
    this.isLoading = true;
    console.log('register clicked');
    const payload = {
      b_name: form.value.businessName,
      b_contact_num: String(form.value.contactNumber),
      admin_name: form.value.ceoName,
      admin_email: form.value.registeringEmail,
      admin_password: form.value.pwd
    };
    console.log('Registering:', payload);
    this.backendApisService.register(payload).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.isLoading = false;
          console.log('Business registered successfully');
          alert('Business registered successfully');
          this.router.navigate(['/login']);
        } else {
          console.error('Registration failed:', response.message);
          alert('Registration failed: ' + response.message);
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('API error:', error);
        alert('An error occurred while registering the business.');
      }
    });
  }
}
