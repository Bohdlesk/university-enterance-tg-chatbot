import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define('unanswered_questions', {
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
}, { timestamps: false });
