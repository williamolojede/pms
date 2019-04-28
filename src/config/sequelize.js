import { config as getEnv } from 'dotenv';

getEnv();

const databaseURLs = {
  development: process.env.DATABASE_URL,
  staging: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL,
};

const environment = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
const databaseURL = databaseURLs[environment];
const isDevMode = environment !== 'production';

const config = {
  url: databaseURL,
  dialect,
  logging: isDevMode ? log => log : false,
  dialectOptions: {
    multipleStatements: true,
  },
};

module.exports = config;
