import { DataTypes } from 'sequelize';

import { db } from '../bd';

export default db.define('user_types', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
},
{
  timestamps: false,
});
