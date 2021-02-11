import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define('faqs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  answer: {
    type: DataTypes.STRING(2000),
    allowNull: false,
  },
  stats: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});
