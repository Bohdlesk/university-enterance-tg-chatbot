import { Router } from 'express';

import createUserValidatorMiddleware from './createUser';
import deleteUserValidatorMiddleware from './deleteUser';
import updateUserValidatorMiddleware from './updateUser';
import getAllUserValidatorMiddleware from './getAllUsers';
import getUserByIdMiddleware from './getUserById';
import getUsersStatisticMiddleware from './getUsersStatistic';

const usersValidatorsMiddleware = Router();

usersValidatorsMiddleware.use('/', createUserValidatorMiddleware);
usersValidatorsMiddleware.use('/', deleteUserValidatorMiddleware);
usersValidatorsMiddleware.use('/', updateUserValidatorMiddleware);
usersValidatorsMiddleware.use('/', getAllUserValidatorMiddleware);
usersValidatorsMiddleware.use('/:id', getUserByIdMiddleware);
usersValidatorsMiddleware.use('/statistics', getUsersStatisticMiddleware);

export default usersValidatorsMiddleware;
