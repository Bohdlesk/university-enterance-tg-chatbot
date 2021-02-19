import { Router } from 'express';

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserDataController,
  getUsersAmountController,
} from '../controllers';

const usersRouter = Router();

usersRouter.get('/statistics', getUsersAmountController);
usersRouter.post('/', createUserController);
usersRouter.delete('/', deleteUserController);
usersRouter.get('/', getAllUsersController);
usersRouter.get('/:id', getUserByIdController);
usersRouter.put('/', updateUserDataController);

export { usersRouter };
