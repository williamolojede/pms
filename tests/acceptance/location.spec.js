import omit from 'lodash/omit';

import { init, expect, models } from '../test-utils/testSetup';

const fakeLocation = {
  name: 'egbeda',
  male: 300,
  female: 420,
};

describe('Location', () => {
  let server;
  const locationsEndpoint = '/api/v1/locations';

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  describe('create location', () => {
    before(() => models.sequelize.sync({ force: true }));

    it('must contain location\'s name in payload', async () => {
      const res = await server.inject({
        method: 'POST',
        url: locationsEndpoint,
        payload: omit(fakeLocation, ['name'])
      });
      expect(res.statusCode).to.equal(400);
      expect(res.result.statusCode).to.equal(400);
      expect(res.result.error).to.equal('Bad Request');
      expect(res.result.message).to.equal('Invalid request payload input');
    });

    it('must contain location\'s male population in payload', async () => {
      const res = await server.inject({
        method: 'POST',
        url: locationsEndpoint  ,
        payload: omit(fakeLocation, ['male'])
      });
      expect(res.statusCode).to.equal(400);
      expect(res.result.statusCode).to.equal(400);
      expect(res.result.error).to.equal('Bad Request');
      expect(res.result.message).to.equal('Invalid request payload input');
    });

    it('must contain location\'s female population in payload', async () => {
      const res = await server.inject({
        method: 'POST',
        url: locationsEndpoint,
        payload: omit(fakeLocation, ['female'])
      });
      expect(res.statusCode).to.equal(400);
      expect(res.result.statusCode).to.equal(400);
      expect(res.result.error).to.equal('Bad Request');
      expect(res.result.message).to.equal('Invalid request payload input');
    });

    it('should create a location', async () => {
      const res = await server.inject({
        method: 'POST',
        url: locationsEndpoint,
        payload: fakeLocation,
      });

      expect(res.statusCode).to.equal(201);
      expect(res.result.location.id).to.be.a('string');
      expect(res.result.message).to.equal('Location created successfully.');
      expect(res.result.status).to.equal('success');
      expect(res.result.location.name).to.equal(fakeLocation.name);
      expect(res.result.location.male).to.equal(fakeLocation.male);
      expect(res.result.location.female).to.equal(fakeLocation.female);
      expect(res.result.location.total).to.equal(fakeLocation.male + fakeLocation.female);
    });

    it('should not create a location when a location with the name exists', async () => {
      const res = await server.inject({
        method: 'POST',
        url: locationsEndpoint,
        payload: fakeLocation,
      });

      expect(res.statusCode).to.equal(409);
      expect(res.result.statusCode).to.equal(409);
      expect(res.result.error).to.equal('Conflict');
      expect(res.result.message).to.equal('Oops. There is an existing location with this name.');
    });
  })

  describe('get locations', () => {
    before(async () => {
      await models.sequelize.sync({ force: true });
      await models.Location.create(fakeLocation);
    });

    it('should retrieve all locations', async () => {
      const res = await server.inject({
        method: 'GET',
        url: locationsEndpoint,
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result.message).to.equal('Locations retrieved successfully.');
      expect(res.result.locations).to.have.lengthOf(1);
      expect(res.result.status).to.equal('success');
    });
  });

  describe('update location', () => {
    let locationId;
    before(async () => {
      await models.sequelize.sync({ force: true });
      const location = await models.Location.create(fakeLocation);
      locationId = location.id;
    });

    it('must have valid uuid/v4 locationId in request params', async () => {
      const res = await server.inject({
        method: 'PATCH',
        url: `${locationsEndpoint}/notgoingtowork`,
        payload: fakeLocation,
      });
      expect(res.statusCode).to.equal(400);
      expect(res.result.statusCode).to.equal(400);
      expect(res.result.error).to.equal('Bad Request');
      expect(res.result.message).to.equal('Invalid request params input');
    });

    it('should update a location', async () => {
      const res = await server.inject({
        method: 'PATCH',
        url: `${locationsEndpoint}/${locationId}`,
        payload: {
          name: 'ibadan',
        },
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result.message).to.equal('Location updated successfully.');
      expect(res.result.location.name).to.equal('ibadan');
      expect(res.result.status).to.equal('success');
    });

    it('should respond with http status 404 when location does not exist', async () => {
      const res = await server.inject({
        method: 'PATCH',
        url: `${locationsEndpoint}/82d24488-1cdc-41c1-9dda-4ff5a95ac6f5`,
        payload: {
          name: 'ibadan',
        },
      });
      expect(res.statusCode).to.equal(404);
      expect(res.result.statusCode).to.equal(404);
      expect(res.result.error).to.equal('Not Found');
      expect(res.result.message).to.equal('Oops. Location does not exist.');
    })
  })

  describe('delete location', () => {
    let locationId;
    before(async () => {
      await models.sequelize.sync({ force: true });
      const location = await models.Location.create(fakeLocation);
      locationId = location.id;
    });

    it('must have valid uuid/v4 locationId in request params', async () => {
      const res = await server.inject({
        method: 'DELETE',
        url: `${locationsEndpoint}/notgoingtowork`,
      });
      expect(res.statusCode).to.equal(400);
      expect(res.result.statusCode).to.equal(400);
      expect(res.result.error).to.equal('Bad Request');
      expect(res.result.message).to.equal('Invalid request params input');
    });

    it('should delete a location', async () => {
      const res = await server.inject({
        method: 'DELETE',
        url: `${locationsEndpoint}/${locationId}`,
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result.message).to.equal('Location deleted successfully.');
      expect(res.result.status).to.equal('success');
    });

    it('should respond with http status 404 when location does not exist', async () => {
      const res = await server.inject({
        method: 'DELETE',
        url: `${locationsEndpoint}/82d24488-1cdc-41c1-9dda-4ff5a95ac6f5`,
      });
      expect(res.statusCode).to.equal(404);
      expect(res.result.statusCode).to.equal(404);
      expect(res.result.error).to.equal('Not Found');
      expect(res.result.message).to.equal('Oops. Location does not exist.');
    })
  });
});
