/* eslint-disable lines-between-class-members */

import {
  DataTypes, Model,
} from 'sequelize';

import { db } from '../bd';

export interface IFaq {
  name: string;
  question: string;
  answer: string;
  stats?: number;
}

class FAQ extends Model<IFaq> implements IFaq {
  public name!: string;
  public question!: string;
  public answer!: string;
  public stats!: number;
}

FAQ.init({
  name: {
    type: DataTypes.STRING,
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
    defaultValue: 0,
  },
},
{
  sequelize: db,
  tableName: 'faqs',
  timestamps: false,
});

export default FAQ;
