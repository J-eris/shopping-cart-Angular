import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent {

  username: string = '';

  public orderNumber: string = this.generateOrderNumber();
  private userService = inject(UserService);
  
  // Generar número de orden aleatorio
  generateOrderNumber(): string {    
    const randomNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
    return randomNumber;
  }

  // Verificamos la autenticación del usuario
  isAuth() {
    const result = this.userService.isAuth();
    if (result) {
      this.username = localStorage.getItem('username')!;
    }
    return result;
  }

}
