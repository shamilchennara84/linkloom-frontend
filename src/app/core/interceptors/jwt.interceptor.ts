import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { isTokenExpired } from '../helpers/jwt-token';
import { AuthService } from '../services/auth.service';
import { type Observable } from 'rxjs/internal/Observable';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const urlArr = req.url.split('/');
  const user = urlArr[0];
  const router = urlArr[1];
  const authService = inject(AuthService)
  console.log('urlArr',urlArr,'user',user,'router',router);
  //Bypass interceptor logic
  if (req.headers.has('Bypass-Interceptor')) {
    console.log('bypassing the jwtintercpetor');
    return next(req);
  }

  // for login and register request
  if (router === 'login' || router === 'register') {
    return next(req);
  }

  //validateOTP and resend OTP Authtoken
  if (router === 'validateOTP' || router === 'resendOtp') {
    console.log('getting authToken, inside validateOTp or resend otp');
    const authToken = localStorage.getItem(`${user}AuthToken`);
    console.log(authToken);
    if (authToken) {
      const authRequest = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
      return next(authRequest);
    }
    console.log('authToken not available');
    return next(req);
  }

  //Getting access token
  const accessToken = localStorage.getItem(`${user}AccessToken`);
  if (accessToken && !isTokenExpired(accessToken)) {
    const accessRequest = req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    console.log('handling accessed request');
    return next(accessRequest);
  }
  localStorage.removeItem(`${user}Accesstoken`); //removing accesstoken if expired.
  //checking refresh token if access token is invalid
  const refreshToken = localStorage.getItem(`${user}RefreshToken`);
  if (refreshToken && !isTokenExpired(refreshToken)) {
    authService.getAccessToken(refreshToken).subscribe({
      next: (res: { accessToken: string }) => {
        const newAccessToken = res.accessToken;
        localStorage.setItem(`${user}AccessToken`, newAccessToken);
        const newAccessRequest = req.clone({ setHeaders: { Authorization: `Bearer ${newAccessToken}` } });
        return next(newAccessRequest);
      },
    });
    console.log('handling request without jwt token');
    return next(req);
  } else {
    console.log('No valid refresh token found');
    return next(req);
  }
};
