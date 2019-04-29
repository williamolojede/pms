import homeCTRL from '../controllers/home';

const homeRoutes = {
  name: 'api-home',
  register: (server) => {
    server.route([
      {
        method: 'GET',
        path: '/',
        handler: homeCTRL.getHome,
        config: {
          auth: false,
          tags: ['api'],
        },
      },
    ]);
  },
};

module.exports = homeRoutes;
