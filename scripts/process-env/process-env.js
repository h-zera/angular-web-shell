const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = './src/core/environments/environment.prod.ts';
  const envConfigFile = `import {Environment} from '@environments/environment.interface';

export const environment = {
  production: true,
  internalKey: '${process.env.WEB_SHELL_INTERNAL_KEY}',
  microFronts: {
    portfolio: {
      url: '${process.env.PORTFOLIO_MICRO_FRONT_URL}',
      exposedModule: '${process.env.PORTFOLIO_MICRO_FRONT_EXPOSED_MODULE}',
      component: '${process.env.PORTFOLIO_MICRO_FRONT_COMPONENT}'
    }
  }
} satisfies Environment;
  `;
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
    }
  });
};

setEnv();
