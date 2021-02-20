import { Sequelize } from 'sequelize';
import { conString } from './const';

const db = new Sequelize(
  conString,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: process.env.NODE_ENV === 'production'
      ? false
      : console.log,
  },
);

async function connectToDB(): Promise<void> {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export {
  connectToDB, db,
};
