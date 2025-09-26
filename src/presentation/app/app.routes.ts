import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import {environment} from "@environments/environment";
import {inject} from '@angular/core';
import {MicroFrontsService} from '../../core/services/micro-fronts/micro-fronts.service';

const microFronts = environment.microFronts;

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./views/landing/landing.routes').then(
            (m) => m.landingRoutes
        )
    },
    {
        path: 'portfolio',
        loadChildren: () => inject(MicroFrontsService).safeRemoteModule({
          remoteEntry: microFronts.portfolio.url,
          exposedModule: microFronts.portfolio.exposedModule,
          exportName: microFronts.portfolio.component
        })
    },
    {
      path: 'error',
      loadChildren: () => import('./views/error/error.routes').then(
          (m) => m.errorRoutes
      )
    },
    {
        path: '**',
        redirectTo: '/error/not-found'
    }
];
