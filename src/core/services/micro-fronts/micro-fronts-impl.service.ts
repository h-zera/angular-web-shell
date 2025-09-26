import {inject, Injectable} from '@angular/core';
import {MicroFrontsService} from './micro-fronts.service';
import {loadRemoteModule} from '@angular-architects/module-federation';
import {NavigationService} from '../navigation/navigation.service';
import {EMPTY} from 'rxjs';
import {environment} from '@environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MicroFrontsImplService implements MicroFrontsService{
    private navigation = inject(NavigationService);
    private translate = inject(TranslateService);

    async safeRemoteModule(options: { remoteEntry: string; exposedModule: string; exportName: string; }): Promise<any> {
      const loadRemote = () => loadRemoteModule({type: 'module', ...options})
        .then(m => m[options.exportName]);

      try {
        return await loadRemote();
      } catch (err) {
        console.error('Error loading remote module', err);
        this.navigation.navigateTo(['/error', '503'], {
          data: {
            [environment.internalKey]: true,
            message: this.translate.instant('error.messages.503'),
          }
        });
        return EMPTY as any;
      }
    }
}
