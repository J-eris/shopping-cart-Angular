import { Component, OnInit, inject } from '@angular/core';
import { CartService } from './services/cart.service';
import { IProduct } from './models/product.model';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shopping-cart';

  private destroy$ = new Subject<void>();

  cartList: IProduct[] = [];
  username: string = '';

  private cartService = inject(CartService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  userService = inject(UserService);

  // Inicializamos el componente
  ngOnInit(): void {
    this.loadCart();
  }

  // Destruimos el componente
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Obtenemos el carrito de compras
  loadCart() {
    this.cartService.myCart$.pipe(takeUntil(this.destroy$)).subscribe((data: IProduct[]) => {
      this.cartList = data;
    });
  }

  // Calculamos la suma total de la cantidad de productos
  getTotalQuantity() {
    const result = this.cartList.reduce((total, product) => total + product.quantity!, 0);
    return result;
  }

  // Obtenemos el total del carrito
  totalCart() {
    return this.cartService.totalCart();    
  }

  // Verificamos la autenticación del usuario
  isAuth() {
    const result = this.userService.isAuth();
    if (result) {
      this.username = localStorage.getItem('username')!;
    }
    return result;
  }

  // Cerrar sesión
  logout() {
    this.userService.logout();
    this. alertService.InfoAlert('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  // Procesamos la compra
  processSale() {
    if (this.cartList.length === 0) {
      this.alertService.WarningAlert('El carrito está vacío');
      return;
    }

    this.cartService.clearCart();
    this.alertService.SuccessAlert('Compra realizada');
    this.router.navigate(['/sale']);
  }

}
