import { Sequelize, Model } from 'sequelize';

/**
 * User Model
 *
 * @export
 * @class User
 * @extends {Model}
 */
export default class Location extends Model {
  static modelFields = {
    name: {
      type: Sequelize.STRING,
      unique: {
        args: true,
        msg: 'Oops. There is an existing location with this name.',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Oops. Please give a name for this location.',
        },
      },
      set(value) {
        this.setDataValue('content', value.trim());
      },
    },
    male: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    female: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }

  /**
   * iInitializes the User model
   *
   * @static
   * @memberof User
   *
   * @param {any} sequelize the sequelize obbject
   *
   * @returns {object} the User model
   */
  static init(sequelize) {
    const model = super.init(Location.modelFields, { sequelize });
    return model;
  }
}
