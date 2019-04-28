import logger from '../logger';

export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize
    .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }))
    .catch(error => logger.error(error.stack)),
  down: queryInterface => queryInterface
    .dropTable('Users')
    .catch(error => logger.error(error.stack)),
}
