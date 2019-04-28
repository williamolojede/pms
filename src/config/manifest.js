import { config as getEnv } from 'dotenv';
import Pack from '../../package.json';

getEnv();

const isDevMode = process.env.NODE_ENV === 'development';

const routesPlugins = ['home'].map(route => ({
  plugin: `./api/routes/${route}`,
  routes: {
    prefix: route === 'home' ? '/api/v1/' : `/api/v1/${route}`,
  },
}));

const manifest = {
  server: {
    port: process.env.PORT || 1997,
  },
  register: {
    plugins: [
      'inert',
      'vision',
      ...routesPlugins,
      {
        plugin: 'hapi-swagger',
        options: {
          info: {
            title: `${Pack.name} Documentation`,
            version: Pack.version,
          },
          basePath: '/api/v1',
          jsonEditor: true,
        },
      },
    ],
  },
};

if (isDevMode) {
  manifest.register.plugins.push('blipp');
  manifest.register.plugins.push({
    plugin: 'good',
    options: {
      ops: { interval: 1000 },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', error: '*' }],
          },
          {
            module: 'good-console',
          },
          'stdout',
        ],
      },
    },
  });
}

export default manifest;
