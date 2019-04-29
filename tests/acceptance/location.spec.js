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
      expect(res.result.location.name).to.equal(fakeLocation.name);
      expect(res.result.location.male).to.equal(fakeLocation.male);
      expect(res.result.location.female).to.equal(fakeLocation.female);
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
});
