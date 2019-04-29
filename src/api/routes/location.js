import Joi from 'joi';
import locationController from '../controllers/location';

const locationRoutes = {
  name: 'locations-route',
  register: (server) => {
    server.route([
      {
        method: 'POST',
        path: '/',
        handler: locationController.createLocation,
        config: {
          auth: false,
          tags: ['api', 'locations'],
          validate: {
            payload: {
              name: Joi.string().required(),
              male: Joi.number().required(),
              female: Joi.number().required(),
            }
          }
        },
      },
    ]);
  },
};

module.exports = locationRoutes;
