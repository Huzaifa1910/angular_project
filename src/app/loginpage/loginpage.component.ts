import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {
    constructor(private router: Router) {
        console.log('Login page loaded');
    }

    login(form: any){
      // Print all form fields in the console
      console.log('Login clicked');
      console.log('Form Data:', form.value);
      var flag = false;
      for(let i = 0; i<this.roles.length; i++){
        var email = this.roles[i].email
        console.log(email)
        if(email === form.value.email){
          flag = true; 
          break
        }
        else{
          flag = false;
        }
      }
      if(!flag){
        return alert("Invalid Email")
      }
      // Check if the email and password are correct
      if (form.value.password === '12345678') {
        // Get the role by email
        const role = this.getRoleByEmail(form.value.email);
        if (role) {
          // Set the role in session storage
          sessionStorage.setItem('userRole', role);

          // Navigate accordingly based on the role
          switch (role) {
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            case 'superadmin':
              this.router.navigate(['/dashboard']);
              break;
            case 'member':
              this.router.navigate(['/member-dashboard']);
              break;
            default:
              console.log('Invalid role');
          }
        } else {
          console.log('Invalid email');
        }
      } else {
        console.log('Invalid credentials');
      }
    }

    registerBusiness() {
        console.log('Register Business clicked');
        // Navigate to the desired component
        this.router.navigate(['/signup']);
    }

    // Define roles with corresponding emails
    roles = [
      { email: 'admin@kbc.com', role: 'admin' },
      { email: 'superadmin@kbc.com', role: 'superadmin' },
      { email: 'member@kbc.com', role: 'member' }
    ];

    // Function to get role by email
    getRoleByEmail(email: string): string | undefined {
      const user = this.roles.find(role => role.email === email);
      return user ? user.role : undefined;
    }
}