import { expect, models } from '../test-utils/testSetup';

const { Location } = models;

const fakeLocation = {
  name: 'egbeda',
  male: 300,
  female: 420,
};


describe('Location Model', () => {
  before(() => models.sequelize.sync({ force: true }));

  it('should create a user account', async () => {
    return expect(Location.create(fakeLocation)).to.eventually.be.fulfilled.then(
      location => {
        expect(location).to.have.property('id');
      },
    );
  });

  it('should not create a location when it\'s name already exist', async () => {
    return expect(Location.create(fakeLocation)).to.eventually.be.rejected.then(err => {
      expect(err.errors[0].message).to.equal(
        'Oops. There is an existing location with this name.',
      );
    });
  });

  it('should not create a location when the name is empty', async () => {
    return expect(
      Location.create({ ...fakeLocation, name: '' }),
    ).to.eventually.be.rejected.then(err => {
      expect(err.errors[0].message).to.equal(
        'Oops. Please give a name for this location.',
      );
    });
  });
});
