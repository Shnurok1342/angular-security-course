import {LessonsComponent} from './lessons/lessons.component';
import {Routes} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ADMINS_ONLY_GUARD_TOKEN} from './guards/authorization.guard';

export const routesConfig: Routes = [
  {
    path: 'lessons',
    component: LessonsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ADMINS_ONLY_GUARD_TOKEN]
  },
  {
    path: '',
    redirectTo: '/lessons',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/lessons',
    pathMatch: 'full'
  }
];
