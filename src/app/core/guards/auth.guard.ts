import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isTokenExpired } from '../helpers/jwt-token';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  const router = inject(Router);
  const role = route.parent?.parent?.routeConfig?.path;
  // console.log("hello auth guard");

  // Check if localStorage is available
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      const token = localStorage.getItem(`${role}RefreshToken`);
      // console.log('role', role, 'route', route, 'token', token);

      if (token === null || isTokenExpired(token)) {
        if (role !== 'user') {
          console.log(`routing to ${role} login`);
          router.navigate([`/${role}/login`]);
          return false;
        }

        Swal.fire({
          title: 'You are not logged in',
          text: 'Do you want to redirect to login page',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            router.navigate(['/user/login']);
          }
        });
        return false;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Handle the error appropriately, e.g., redirect to an error page
      return false;
    }
  } else {
    // Handle the case where localStorage is not available
    console.warn('localStorage is not available authguard');
    return false;
  }

  return true;
};
