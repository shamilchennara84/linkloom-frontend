import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.warn('error during api calls', err);
      console.log('firing swa; with heading: ', err.statusText);
      void Swal.fire(err.statusText, err.error.message, 'error');
      return throwError(() => err);
    })
  );
};
