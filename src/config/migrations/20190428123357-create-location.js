
import logger from '../logger';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    female: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    male: {
      type: Sequelize.INTEGER,
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
  })
  .catch(error => logger.error(error.stack)),
  down: queryInterface => queryInterface
    .dropTable('Users')
    .catch(error => logger.error(error.stack)),
}
