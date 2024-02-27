import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  // Inyectamos los servicios necesarios
  private cartService = inject(CartService);
  private alertService = inject(AlertService);
  private router = inject(Router);

  cartList: IProduct[] = [];

  ngOnInit(): void {
    this.LoadCartChanges();
  }

  // Destruimos el componente
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Obtenemos el carrito de compras
  LoadCartChanges() {
    this.cartService.myCart$.pipe(takeUntil(this.destroy$)).subscribe((data: IProduct[]) => {
      // console.log(data);
      this.cartList = data;
    });
  }

  // Calculamos el total del producto
  totalProducts(price: number, quantity: number) {
    return price * quantity;
  }

  // Eliminamos un producto del carrito
  deleteProduct(id: number | string) {
    this.cartService.deleteProduct(id);
    this.alertService.DangerAlert('Producto eliminado');
  }

  // Actualizamos la cantidad de un producto
  updateQuantity(operation: string, id: string | number) {
    const product = this.cartService.findProductById(id);
    if (product) {
      if (operation === 'minus' && product.quantity! > 0) {
        product.quantity = product.quantity! - 1;
      }
      if (operation === 'add') {
        product.quantity = product.quantity! + 1;
      }
      if (product.quantity === 0) {
        this.deleteProduct(product.id);
      }

      this.cartService.updateProductCart(product);
    }
  }

  // Calculamos el total de la compra
  totalCart() {
    return this.cartService.totalCart();    
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
