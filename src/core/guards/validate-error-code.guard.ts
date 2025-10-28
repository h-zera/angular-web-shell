import {inject, Injectable} from '@angular/core';
import {
  CanMatch,
  GuardResult,
  MaybeAsync, Route,
  UrlSegment
} from '@angular/router';
import {NavigationService} from '../services/navigation/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateErrorCodeGuard implements CanMatch {
    private readonly navigation = inject(NavigationService);

    canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
      const isInternal = this.navigation.isInternalNavigation();

      if (!isInternal) {
        this.navigation.navigateTo('error/not-found');
        return false;
      }

      return true;
    }
}
