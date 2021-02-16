import { DataTypes } from 'sequelize';

import { db } from '../bd';

export enum UserRoles {
    regularUser = 1,
    admin = 2,
    superAdmin = 3
}

export default db.define('user_roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},
{
  timestamps: false,
});
