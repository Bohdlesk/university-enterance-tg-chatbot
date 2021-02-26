/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable lines-between-class-members */

import {
  DataTypes, Model, Optional,
} from 'sequelize';

import { db } from '../bd';

export interface IUnansweredQuestions {
  id: number;
  question: string;
  createdAt: Date;
}

interface IUnansweredQuestionsCreation
  extends Optional<IUnansweredQuestions, 'id' | 'createdAt'> {}

class UnansweredQuestions
  extends Model<IUnansweredQuestions, IUnansweredQuestionsCreation>
  implements IUnansweredQuestions {
  public id!: number;
  public question!: string;
  public readonly createdAt!: Date;
}

UnansweredQuestions.init({
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
}, {
  sequelize: db,
  tableName: 'unanswered_questions',
  timestamps: false,
});

export default UnansweredQuestions;
