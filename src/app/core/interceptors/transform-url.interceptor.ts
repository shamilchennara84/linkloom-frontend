import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export const transformUrlInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (request.headers.has('Bypass-Interceptor')) {
    console.log('deleting Bypass interceptor comment');
    const bypassedRequest = request.clone({ headers: request.headers.delete('Bypass-Interceptor') });
    return next(bypassedRequest);
  }
  const { baseUrl } = environment;
  const newReq = request.clone({ url: baseUrl + request.url });
  console.log(newReq.url, `new url from interceptor`);
  return next(newReq);
};
