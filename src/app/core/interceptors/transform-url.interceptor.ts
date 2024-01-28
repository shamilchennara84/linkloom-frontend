import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export const transformUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (req.headers.has('Bypass-Interceptor')) {
    console.log('deleting Bypass interceptor comment');
    const bypassedRequest = req.clone({ headers: req.headers.delete('bypass-interceptor') });
    return next(bypassedRequest);
  }
  const { baseUrl } = environment;
  const newReq = req.clone({ url: baseUrl + req.url });
  console.log(newReq.url, `new url from interceptor`);
  return next(newReq);
};
