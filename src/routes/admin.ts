import { Router } from 'express';

import * as controllers from '../controllers/admin';
import * as validators from '../middlewares/validators/admin';

const adminsRouter = Router();

adminsRouter.put('/add', validators.addAdminValidatorMiddleware, controllers.addAdminController);
adminsRouter.get('/list', controllers.getAdminListController);
adminsRouter.put(
  '/delete',
  validators.deleteAdminValueValidatorMiddleware,
  controllers.deleteAdminController,
);

export { adminsRouter };
