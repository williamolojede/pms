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
  getLocations: async (request, h) => {
    const locations = await Location.findAll();

    return h
      .response({
        status: 'success',
        message: 'Locations retrieved successfully.',
        locations,
      })
      .code(200);
  },
  updateLocation: async (request, h) => {
    const { params, payload } = request;
    const location = await Location.findByPk(params.locationId);

    if (!location) {
      return Boom.notFound('Oops. Location does not exist.');
    }

    await location.update(payload);

    return h
      .response({
        status: 'success',
        message: 'Location updated successfully.',
        location
      })
      .code(200);
  },
  deleteLocation: async (request, h) => {
    const { locationId } = request.params;

    const location = await Location.destroy({ where: { id: locationId } });

    if (location === 0) {
      return Boom.notFound('Oops. Location does not exist.');
    }

    return h
      .response({
        status: 'success',
        message: 'Location deleted successfully.',
      })
      .code(200);
  },
};

export default locationCTRL;
