import fs from 'fs';
import { Sequelize } from 'sequelize';
import config from '../../config/sequelize';

const sequelize = new Sequelize(config.url, config);
const db = {};

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file.slice(-3) === '.js',
  )
  .forEach(file => {
    /* eslint-disable import/no-dynamic-require */
    /* eslint-disable global-require */
    const model = require(`./${file}`).default.init(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
