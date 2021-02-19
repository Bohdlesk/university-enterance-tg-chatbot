/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable lines-between-class-members */

import {
  DataTypes, Model,
} from 'sequelize';

import { db } from '../bd';
import UserType from './UserType';
import UserRole from './UserRole';

export interface IUser {
  id: number;
  username?: string | null;
  name: string;
  'phone_number'?: string | null;
  'type_name'?: string;
  city: string;
  'role_name'?: string;
  state: JSON;
}

class User extends Model<IUser> implements IUser {
  public id!: number;
  public username!: string | null;
  public name!: string;
  public 'phone_number'!: string | null;
  public 'type_name'!: string;
  public city!: string;
  public 'role_name'!: string;
  public state!: JSON;
}

User.init({
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
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default User;
