import {NavigationService} from './navigation/navigation.service';
import {NavigationImplService} from './navigation/navigation-impl.service';
import {MicroFrontsService} from './micro-fronts/micro-fronts.service';
import {MicroFrontsImplService} from './micro-fronts/micro-fronts-impl.service';

export function provideAppServices() {
  return [
    { provide: NavigationService, useClass: NavigationImplService },
    { provide: MicroFrontsService, useClass: MicroFrontsImplService },
  ];
}
