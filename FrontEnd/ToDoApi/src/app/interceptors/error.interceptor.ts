import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable }   from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Erro: ${error.error.message}`;
        } else {
          errorMsg = `Código: ${error.status}, Mensagem: ${error.message}`;
        }
        console.error('Interceptor:', errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
