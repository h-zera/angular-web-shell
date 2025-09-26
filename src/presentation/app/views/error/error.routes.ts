import {Routes} from '@angular/router';
import {ValidateErrorCodeGuard} from '@guards/validate-error-code.guard';

export const errorRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'not-found'
  },
  {
    path: 'not-found',
    loadComponent: () => import('./not-found/view/not-found-view.component').then(m => m.NotFoundViewComponent)
  },
  {
    path: ':code',
    loadComponent: () => import('./generic/view/generic-error-view.component').then(m => m.GenericErrorViewComponent),
    canMatch: [ValidateErrorCodeGuard]
  }
]
