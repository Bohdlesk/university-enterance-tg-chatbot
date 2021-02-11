import { Router } from 'express';

import usersValidatorsMiddleware from './users';

const validatorsMiddleware = Router();

validatorsMiddleware.use('/users', usersValidatorsMiddleware);

export default validatorsMiddleware;
