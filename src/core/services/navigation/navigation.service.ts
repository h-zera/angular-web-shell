import {Signal} from '@angular/core';

export abstract class NavigationService {
  abstract get isInternalNavigation(): Signal<boolean>;

  abstract get stateData(): Signal<{[p: string]: any} | undefined>;

  abstract fromData<T>(key: string): Signal<T | undefined>;

  abstract navigateTo(path: string | string[], options?: {
    queryParams?: {[key: string]: any};
    data?: {[key: string]: any};
    fragment?: string;
  }): Promise<boolean>;
}
