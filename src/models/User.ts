import { DataTypes } from 'sequelize';

import { db } from '../bd';
import UserType from './UserType';
import UserRole from './UserRole';

export interface IUser {
  id?: number;
  tgId: number;
  tgUsername: string;
  phoneNumber?: string | null;
  userType?: number;
  city?: string;
  roleId?: number;
  state: string;
}

export default db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tg_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  tg_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    unique: true,
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    references: {
      model: UserType,
      key: 'id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    references: {
      model: UserRole,
      key: 'id',
    },
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.JSON,
    allowNull: false,
  },
},
{
  timestamps: false,
});
