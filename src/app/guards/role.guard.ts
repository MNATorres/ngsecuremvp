import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../common/enums/role';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.getUser();
  const roles = route.data?.['roles'] as Role[];
  const router = inject(Router);

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  if (user.role === Role.SUPER_ADMIN) {
    return true;
  }

  if (user.role === Role.ADMIN) {
    if (roles.includes(Role.ADMIN) || roles.includes(Role.USER)) {
      return true;
    }
  }

  if (user.role === Role.USER) {
    if (roles.includes(Role.USER)) {
      return true;
    }
  }

  router.navigate(['/home']);
  return false;
};
