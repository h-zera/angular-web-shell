import {Environment} from '@environments/environment.interface';

export const environment = {
  production: true,
  internalKey: '{{WEB_SHELL_INTERNAL_KEY}}',
  microFronts: {
    portfolio: {
      url: '{{PORTFOLIO_MICRO_FRONT_URL}}',
      exposedModule: '{{PORTFOLIO_MICRO_FRONT_EXPOSED_MODULE}}',
      component: '{{PORTFOLIO_MICRO_FRONT_COMPONENT}}'
    }
  }
} satisfies Environment;
