import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define('bot_settings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  value: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: false,
});
