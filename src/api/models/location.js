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
      type: Sequelize.STRING
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
