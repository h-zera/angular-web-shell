import {computed, effect, inject, Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from './navigation.service';
import {environment} from '@environments/environment';

@Injectable()
export class NavigationImplService implements NavigationService {
  private readonly router: Router = inject(Router);

  private internalNavigationSignal = signal(false);
  private dataSignal: WritableSignal<{[p: string]: any} | undefined> = signal(undefined);

  private setDataSignal(data: {[key: string]: any}) {
    let result = {...data};
    if (result[environment.internalKey]) {
      delete result[environment.internalKey];
    }
    this.dataSignal.set(result);
  }

  fromData<T>(key: string): Signal<T | undefined> {
    return computed(() => this.dataSignal()?.[key] as T | undefined);
  }

  get isInternalNavigation(): Signal<boolean> {
    return this.internalNavigationSignal;
  }

  get stateData(): Signal<{[p: string]: any} | undefined> {
    return this.dataSignal;
  }

  async navigateTo(path: string | string[], options?: {
    queryParams?: {[key: string]: any};
    data?: {[key: string]: any};
    fragment?: string;
  }): Promise<boolean> {
    this.internalNavigationSignal.set(options?.data?.[environment.internalKey] === true);
    this.setDataSignal(options?.data || {});
    return await this.router.navigate(
      typeof path === 'string' ? [path] : path, {
      queryParams: options?.queryParams,
      fragment: options?.fragment,
      state: options?.data,
    });
  }
}
