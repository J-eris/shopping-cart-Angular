import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'https://fakestoreapi.com/products'

  private http = inject(HttpClient);

  // Obtenemos todos los productos de la API
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURL).pipe(
      map(products => products.map(product => ({ ...product, quantity: 0 })))
    );
  }

  // Obtenemos un producto por su id
  getProductById(id: string | number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseURL}/${id}`);
  }

}
