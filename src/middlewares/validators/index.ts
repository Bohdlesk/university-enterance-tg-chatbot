import { Router } from 'express';

import usersValidatorsMiddleware from './users';
import settingsValidatorsMiddleware from './settings';
import questionsValidatorsMiddleware from './questions';
import adminsValidatorsMiddleware from './admin';

const validatorsMiddleware = Router();

validatorsMiddleware.use('/users', usersValidatorsMiddleware);
validatorsMiddleware.use('/settings', settingsValidatorsMiddleware);
validatorsMiddleware.use('/questions', questionsValidatorsMiddleware);
validatorsMiddleware.use('/admins', adminsValidatorsMiddleware);

export default validatorsMiddleware;
