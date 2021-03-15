import {LessonsComponent} from './lessons/lessons.component';
import {Routes} from '@angular/router';

export const routesConfig: Routes = [
  {
    path: 'lessons',
    component: LessonsComponent
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
