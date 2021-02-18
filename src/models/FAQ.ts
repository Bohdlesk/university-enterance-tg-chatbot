import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define(
  'faqs',
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
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
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  },
);
