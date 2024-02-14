import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('token', Math.random().toString());
    this.router.navigate(['cms']);
  }

  logout() {
    const confirmation = confirm('Deseja fazer logout?');
    if (confirmation) {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
  }
}
