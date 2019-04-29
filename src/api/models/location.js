import { Sequelize, Model } from 'sequelize';

/**
 * Location Model
 *
 * @export
 * @class Location
 * @extends {Model}
 */
export default class Location extends Model {
  static modelFields = {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
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
    },
    total: {
      type: Sequelize.VIRTUAL(Sequelize.INTEGER, ['male', 'female']),
      get() {
        return this.getDataValue('male') + this.getDataValue('female')
      }
    }
  }

  /**
   * iInitializes the Location model
   *
   * @static
   * @memberof Location
   *
   * @param {any} sequelize the sequelize obbject
   *
   * @returns {object} the Location model
   */
  static init(sequelize) {
    const model = super.init(Location.modelFields, { sequelize });
    return model;
  }
}
