import { init, expect } from '../test-utils/testSetup';

describe('Api Home', () => {
  let server;

  before(async () => {
    server = await init();
  });

  after(async () => {
    await server.stop();
  });

  it('should return http status code 200 and a welcome message', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/api/v1/',
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result.message).to.equal(
      'Welcome to the PMS API gateway',
    );
  });
});
