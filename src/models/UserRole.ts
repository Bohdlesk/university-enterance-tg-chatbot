import { DataTypes } from 'sequelize';

import { db } from '../bd';

export enum UserRoles {
    RegularUser = 'regular',
    Admin = 'admin',
    SuperAdmin = 'super-admin',
}

export default db.define('user_roles', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
},
{
  timestamps: false,
});
