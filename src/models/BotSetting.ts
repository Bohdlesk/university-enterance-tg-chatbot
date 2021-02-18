import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define('bot_settings', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  value: {
    type: DataTypes.STRING(2000),
  },
},
{
  timestamps: false,
});
