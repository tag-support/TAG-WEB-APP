import { CanActivateFn, Router } from '@angular/router';
import { filter, take, map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { ApiService } from '../services/auth/api.service';

export const authGuardGuard: CanActivateFn = (route, state) : Observable<boolean> => {
  const router = inject(Router);
  const apiService = inject(ApiService);
  return apiService.isAuthenticated.pipe(
    filter(val => val !== null), // Filter out initial Behaviour subject value
    take(1), // Otherwise the Observable doesn't complete!
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigateByUrl('/')
        return true;
      }
    })
  )
};
