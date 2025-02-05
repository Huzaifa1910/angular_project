import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signuppage',
  imports: [
    FormsModule,],
  templateUrl: './signuppage.component.html',
  styleUrl: './signuppage.component.css'
})
export class SignuppageComponent {
    constructor(private router: Router) {
        console.log('Signup page loaded');
    }

    login() {
        console.log('login clicked');
        // Add your business registration logic here
        this.router.navigate(['/login']);
    }
    register(form: any) {
        console.log('register clicked');
        // Add your business registration logic here
        console.log('Form Data:', form.value);
        this.router.navigate(['/dashboard']);
    }
}
