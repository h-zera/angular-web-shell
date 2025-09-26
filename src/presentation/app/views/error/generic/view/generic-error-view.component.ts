import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavigationService} from '@services/navigation/navigation.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-view',
  imports: [
    TranslatePipe
  ],
  templateUrl: './generic-error-view.component.html',
  styleUrl: './generic-error-view.component.scss'
})
export class GenericErrorViewComponent {
  private navigation = inject(NavigationService);
  private route = inject(ActivatedRoute);

  errorCode!: string;
  errorMessage!: string;

  constructor() {
    this.errorCode = this.route.snapshot.paramMap.get('code') || 'unknown';
    this.errorMessage = this.navigation.fromData<string>('message')() || 'An unexpected error occurred.';
  }

  goBack() {
    this.navigation.navigateTo(['/']);
  }
}
