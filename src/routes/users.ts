import { Router } from 'express';

import * as constrollers from '../controllers/users';

import * as validators from '../middlewares/validators/users';

const usersRouter = Router();

usersRouter.get(
  '/statistics',
  validators.getUsersStatisticValidatorMiddleware,
  constrollers.getUsersAmountController,
);
usersRouter.post('/', validators.createUserValidatorMiddleware, constrollers.createUserController);
usersRouter.delete(
  '/',
  validators.deleteUserValidatorMiddleware,
  constrollers.deleteUserController,
);
usersRouter.get('/', validators.getAllUserValidatorMiddleware, constrollers.getAllUsersController);
usersRouter.get(
  '/:id',
  validators.getUserByIdValidatorMiddleware,
  constrollers.getUserByIdController,
);
usersRouter.put(
  '/',
  validators.updateUserValidatorMiddleware,
  constrollers.updateUserDataController,
);

export { usersRouter };
