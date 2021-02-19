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

usersRouter.post('/', createUserController);
usersRouter.delete('/', deleteUserController);
usersRouter.get('/', getAllUsersController);
usersRouter.get('/:id', getUserByIdController);
usersRouter.put('/', updateUserDataController);
usersRouter.get('/statistics', getUsersAmountController);

export { usersRouter };
