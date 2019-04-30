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
      {
        method: 'GET',
        path: '/',
        handler: locationController.getLocations,
        config: {
          auth: false,
          tags: ['api', 'locations'],
        },
      },
      {
        method: 'PATCH',
        path: '/{locationId}',
        handler: locationController.updateLocation,
        config: {
          auth: false,
          tags: ['api', 'locations'],
          validate: {
            params: {
              locationId: Joi.string().required().guid({ version: 'uuidv4' }),
            },
            payload: {
              name: Joi.string(),
              male: Joi.number(),
              female: Joi.number(),
            }
          }
        },
      },
      {
        method: 'DELETE',
        path: '/{locationId}',
        handler: locationController.deleteLocation,
        config: {
          auth: false,
          tags: ['api', 'locations'],
          validate: {
            params: {
              locationId: Joi.string().required().guid({ version: 'uuidv4' }),
            }
          }
        },
      },
    ]);
  },
};

module.exports = locationRoutes;
