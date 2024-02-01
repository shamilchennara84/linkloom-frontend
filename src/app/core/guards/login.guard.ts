import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { isTokenExpired } from '../helpers/jwt-token';

export const loginGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  console.log(route.routeConfig?.path);
  const role = route.routeConfig?.path === 'auth' || route.routeConfig?.path === 'user' ? 'user' : 'admin';

  // Check if localStorage is available
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const token = localStorage.getItem(`${role}RefreshToken`);
    console.log('role', role, 'token', token, 'router', route);

    if (token === null || isTokenExpired(token)) {
      // Allow navigation if the token is null or expired
      return true;
    } else {
      // Redirect to home if the token is valid
      console.log('user already logged in');
      router.navigate([`/${role}/home`]);
      return false;
    }
  } else {
    // If localStorage is not available, allow navigation
    console.warn('localStorage is not available loginguard');
    return true;
  }
};

// import { inject } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// export const loginGuard: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): Observable<boolean> => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const role = route.routeConfig?.path;

//   return authService.isAuthenticated$.pipe(
//     map((isAuthenticated) => {
//       if (isAuthenticated) {
//         console.log('user already logged in');
//         router.navigate([`${role}/home`]);
//         return false;
//       }
//       return true;
//     })
//   );
// };
