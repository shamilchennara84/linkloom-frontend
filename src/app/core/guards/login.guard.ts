import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { isTokenExpired } from '../helpers/jwt-token';

export const loginGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  console.log(route.parent?.routeConfig?.path);
  const role = route.parent?.routeConfig?.path;

  // Check if localStorage is available
  // if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const token = localStorage.getItem(`${role}RefreshToken`);
    console.log('role', role, 'token', token, 'router', route);

    if (token === null || isTokenExpired(token)) {
      // Allow navigation if the token is null or expired
      return true;
    } else {
      // Redirect to home if the token is valid
 
      router.navigate([`/${role}/home`]);
      return false;
    }

};

