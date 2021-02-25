import { Router } from 'express';

import * as controllers from '../controllers/users';

import * as validators from '../middlewares/validators/users';

const usersRouter = Router();

usersRouter.get(
  '/statistics',
  validators.getUsersStatisticValidatorMiddleware,
  controllers.getUsersAmountController,
);
usersRouter.post('/', validators.createUserValidatorMiddleware, controllers.createUserController);
usersRouter.delete(
  '/',
  validators.deleteUserValidatorMiddleware,
  controllers.deleteUserController,
);
usersRouter.get('/', validators.getAllUserValidatorMiddleware, controllers.getAllUsersController);
usersRouter.get(
  '/:id',
  validators.getUserByIdValidatorMiddleware,
  controllers.getUserByIdController,
);
usersRouter.put(
  '/',
  validators.updateUserValidatorMiddleware,
  controllers.updateUserDataController,
);

export { usersRouter };
