import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { NotificationService } from 'app/services/notification/notification.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.error.error}`;
            // this.notification.showNotification('top', 'center', 'danger', 'warning', '¡No hay respuesta del servidor!');
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
} 