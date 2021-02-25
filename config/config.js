/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = dbConfig;
