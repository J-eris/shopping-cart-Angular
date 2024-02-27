import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  SuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      showConfirmButton: false,
      timer: 1200
    });
  }

  InfoAlert(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Información',
      text: message,
      showConfirmButton: false,
      timer: 1200    
    });
  }

  WarningAlert(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: message,
      showConfirmButton: false,
      timer: 1200
    });
  }

  DangerAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Peligro',
      text: message,
      showConfirmButton: false,
      timer: 1200
    });
  }

  constructor() { }
}
