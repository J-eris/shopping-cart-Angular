import { Component, OnInit, inject } from '@angular/core';
import { LoadingService } from 'src/app/interceptors/loading.service';
import { IProduct } from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  // Creamos un array de productos vacia y inyectamos los servicios que vamos a utilizar
  productList: IProduct[] = [];  
  
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private alertService = inject(AlertService);
  loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadProducts();
  }

  // Obtenemos los productos de mi servicio product.service.ts
  loadProducts() {
    this.productService.getAllProducts().subscribe((data: IProduct[]) => {
      // console.log(data);
      this.productList = data;      
    });
  }

  // Agregamos un producto al carrito
  addToCart(product: IProduct){
    // console.log(product);
    this.cartService.addProductToCart(product);
    this.alertService.SuccessAlert('Producto agregado');
  }

}
