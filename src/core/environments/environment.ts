import {Environment} from '@environments/environment.interface';

export const environment = {
    production: false,
    internalKey: 'x-internal-key-12345',
    microFronts: {
        portfolio: {
            url: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './Portfolio',
            component: 'PORTFOLIO_ROUTES'
        }
    }
} satisfies Environment;
