import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'https://fakestoreapi.com/auth';

  private http = inject(HttpClient);

  // Solicitar inicio de sesión a la API
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, credentials);
  }

  // Obtener usuario por id
  getUserById(id: string | number): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${id}`);
  }

  // Verificar si el usuario está autenticado
  isAuth(): boolean {
    const authToken = localStorage.getItem('authToken');
    return authToken ? true : false;
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  }

}
