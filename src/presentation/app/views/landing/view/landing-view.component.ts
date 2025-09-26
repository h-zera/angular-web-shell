import {Component, inject} from '@angular/core';
import {LandingViewModel} from '@views/landing/viewmodel/landing.viewmodel';
import {TranslatePipe} from '@ngx-translate/core';
import {NavigationService} from '@services/navigation/navigation.service';

@Component({
  selector: 'app-landing-view',
  imports: [
    TranslatePipe
  ],
  templateUrl: './landing-view.component.html',
  styleUrl: './landing-view.component.scss',
  providers: [LandingViewModel]
})
export class LandingViewComponent {
  private navigation = inject(NavigationService);

  navigateToPortfolio() {
    this.navigation.navigateTo('/portfolio');
  }
}
