import {Environment} from '@environments/environment.interface';

export const environment = {
  production: true,
  internalKey: process.env['WEB_SHELL_INTERNAL_KEY']!,
  microFronts: {
    portfolio: {
      url: process.env['PORTFOLIO_MICRO_FRONT_URL']!,
      exposedModule: process.env['PORTFOLIO_MICRO_FRONT_EXPOSED_MODULE']!,
      component: process.env['PORTFOLIO_MICRO_FRONT_COMPONENT']!
    }
  }
} satisfies Environment;
