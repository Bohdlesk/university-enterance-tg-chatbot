import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define(
  'faqs',
  {
    name: {
      type: DataTypes.STRING(100),
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
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  },
);
