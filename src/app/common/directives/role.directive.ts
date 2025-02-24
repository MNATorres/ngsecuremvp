import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Role } from '../enums/role';
import { toSignal } from '@angular/core/rxjs-interop';
import { IAuthData, ICurrentUserAndRole } from '../models/auth.interface';

@Directive({
  selector: '[hasRole]',
})
export class RoleDirective {
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private user = toSignal(inject(AuthService).currentUserAndRole$);

  roles = input.required<Role[]>({
    alias: 'hasRole',
  });

  constructor() {
    effect(() => {
      const user = this.user();
      const roles = this.roles();

      this.viewContainerRef.clear();

      if (user && roles.length > 0 && this.hasRole(user, roles)) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }

  hasRole(user: ICurrentUserAndRole, roles: Role[]): boolean {
    return roles.includes(user.role);
  }
}
