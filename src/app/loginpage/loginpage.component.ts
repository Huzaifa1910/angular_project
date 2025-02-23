import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BackendApisService } from '../backend-apis.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';


@Component({
  imports: [FormsModule],
  providers: [
    BackendApisService
  ],
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
    constructor(private router: Router, private backendApisService: BackendApisService, private authService: AuthService) {
        console.log('Login page loaded');
    }
    
    login(form: any){
      // Print all form fields in the console
      console.log('Login clicked');
      console.log('Form Data:', form.value);
      const payload = {
        emp_email: form.value.email,
        password: form.value.password
      };
      this.backendApisService.login(payload).subscribe({
        next: (response: any) => {
          console.log('API response:', response);
          if (response.success) {
            console.log('Login successful');
            // consle data that should be received from the API
            this.authService.saveUserData(response.access_token, response.emp_email);
            const role = response.emp_role;
            console.log(role);
            if (role) {
          // Set the role in session storage
          sessionStorage.setItem('userRole', role);

          // Navigate accordingly based on the role
          switch (role) {
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'super_admin':
              this.router.navigate(['/dashboard']);
              break;
            case 'member':
              this.router.navigate(['/member-dashboard']);
              break;
            default:
              console.log('Invalid role');
          }
        }
          } else {
            console.error('Login failed:', response.message);
            alert('Login failed: ' + response.message);
          }
        },
        error: (error) => {
          console.error('API error:', error);
          alert('Login failed: ' + error.message);
        }
      });
    }

    registerBusiness() {
        console.log('Register Business clicked');
        // Navigate to the desired component
        this.router.navigate(['/signup']);
    }

    // Define roles with corresponding emails
    roles = [
      { email: 'admin@kbc.com', role: 'admin' },
      { email: 'superadmin@kbc.com', role: 'super_admin' },
      { email: 'member@kbc.com', role: 'member' }
    ];

    // Function to get role by email
    getRoleByEmail(email: string): string | undefined {
      const user = this.roles.find(role => role.email === email);
      return user ? user.role : undefined;
    }
}