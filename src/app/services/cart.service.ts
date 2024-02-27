import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Creamos un BehaviorSubject para el carrito de compras
  private myCartSubject = new BehaviorSubject<IProduct[]>(this.getCart());
  public myCart$ = this.myCartSubject.asObservable();

  constructor() { }

  // Actualizamos el carrito de compras en el localStorage
  private updateCart(cart: IProduct[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.myCartSubject.next([...cart]);
  }

  // Obtenemos el carrito de compras del localStorage
  getCart(): IProduct[] {
    return JSON.parse(localStorage.getItem('cart') as string) || [];
  }

  // Agregamos un producto al carrito
  addProductToCart(product: IProduct) {
    const cart = this.getCart();
    const existingProduct = cart.find(item => item.id === product.id);

    existingProduct
      ? existingProduct.quantity = (existingProduct.quantity || 0) + 1
      : cart.push({ ...product, quantity: 1 });

    this.updateCart(cart);
  }

  // Eliminamos un producto del carrito
  deleteProduct(id: number | string) {
    const cart = this.getCart().filter(product => product.id !== id);
    this.updateCart(cart);
  }

  // Buscamos un producto por su id
  findProductById(id: string | number): IProduct | undefined {
    return this.getCart().find(item => item.id === id);
  }

  // Actualizamos un producto del carrito
  updateProductCart(updatedProduct: IProduct) {
    const cart = this.getCart().map(item => (item.id === updatedProduct.id ? updatedProduct : item));
    this.updateCart(cart);
  }

  // Obtenemos el total de productos en el carrito
  totalCart(): number {
    return this.getCart().reduce((acc, product) => acc + (product.price * (product.quantity || 0)), 0);
  }

  // Limpiamos el carrito
  clearCart() {
    localStorage.removeItem('cart');
    this.myCartSubject.next([]);
  }

}

