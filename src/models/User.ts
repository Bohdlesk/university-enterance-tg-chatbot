import { DataTypes } from 'sequelize';

import { db } from '../bd';
import UserType from './UserType';
import UserRole from './UserRole';

export interface IUser {
  id: number;
  username?: string;
  name: string;
  phoneNumber?: string | null;
  userType?: number;
  city: string;
  roleId?: number;
  state: string;
}

export default db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
  },
  type_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Applicant',
    references: {
      model: UserType,
      key: 'name',
    },
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'regular',
    references: {
      model: UserRole,
      key: 'name',
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.JSON,
    allowNull: false,
  },
},
{
  timestamps: false,
});
