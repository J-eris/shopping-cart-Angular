import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/interceptors/loading.service';
import { IProduct } from 'src/app/models/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product: IProduct | undefined;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  public loadingService = inject(LoadingService);
  private cartService = inject(CartService);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.loadProducts();
  }

  // Obtenemos el producto por su id
  loadProducts() {
    this.route.params.subscribe(params => {
      this.productService.getProductById(params['id']).subscribe((data: IProduct) => {
        // console.log(data);
        this.product = data;
      });
    });
  }

  // Agregamos un producto al carrito
  addToCart(product: IProduct){
    // console.log(product);
    this.cartService.addProductToCart(product);
    this.alertService.SuccessAlert('Producto agregado');
  }

}
