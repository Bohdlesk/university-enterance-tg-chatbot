import { Router } from 'express';

import * as constrollers from '../controllers/admin';
import * as validators from '../middlewares/validators/admin';

const adminsRouter = Router();

adminsRouter.put('/add', validators.addAdminValidatorMiddleware, constrollers.addAdminController);
adminsRouter.get('/list', constrollers.getAdminListController);
adminsRouter.put(
  '/delete',
  validators.deleteAdminValueValidatorMiddleware,
  constrollers.deleteAdminController,
);

export { adminsRouter };
