import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: any = {
    username: '',
    password: ''
  };
  
  private userService = inject(UserService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  // Iniciar sesión
  login() {
    this.userService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', this.credentials.username);
        this.alertService.SuccessAlert('Bienvenido');
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error de authenticación: ', error);
        this.credentials.password = '';
        this.alertService.DangerAlert('Contraseña o usuario incorrecto');
        this.router.navigate(['/login']);
      }
    );
  }

}
