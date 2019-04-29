import Boom from 'boom';
import models from '../models';

const { Location } = models;

const locationCTRL = {
  createLocation: async (request, h) => {
    const { name } = request.payload;

    const [location, created] = await Location.findOrCreate({
      where: { name },
      defaults: request.payload,
    });

    if (!created) {
      return Boom.conflict('Oops. There is an existing location with this name.');
    }

    return h
      .response({
        status: 'success',
        message: 'Location created successfully.',
        location,
      })
      .code(201);
  },
};

export default locationCTRL;
