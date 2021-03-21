import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../model/user';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';

@Directive({
  selector: '[rbacAllow]'
})
export class RbacAllowDirective implements OnDestroy {
  @Input()
  set rbacAllow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.showIfUserAllowed();
  }

  allowedRoles: string[];
  user: User;
  destroy$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.showIfUserAllowed();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showIfUserAllowed() {
    if (
      !this.allowedRoles ||
      this.allowedRoles.length === 0 ||
      !this.user
    ) {
      this.viewContainer.clear();
      return;
    }
    const isUserAllowed = _.intersection(this.allowedRoles, this.user.roles).length > 0;
    if (isUserAllowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
