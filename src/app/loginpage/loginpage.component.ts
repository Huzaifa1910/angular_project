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

    login(form: any) {
      // Print all form fields in the console
      console.log('Login clicked');
      console.log('Form Data:', form.value);

      // Check if the email and password are correct
      if (form.value.email === 'contact@bubbly.com' && form.value.password === '12345678') {
        // Navigate to the dashboard
        this.router.navigate(['/dashboard']);
      } else {
        console.log('Invalid credentials');
      }
    }

    registerBusiness() {
        console.log('Register Business clicked');
        // Navigate to the desired component
        this.router.navigate(['/signup']);
    }
}
