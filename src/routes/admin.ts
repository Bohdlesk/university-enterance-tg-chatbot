import { Router } from 'express';
import { addAdminController, getAdminListController, deleteAdminController } from '../controllers';

const adminsRouter = Router();

adminsRouter.put('/add', addAdminController);
adminsRouter.get('/list', getAdminListController);
adminsRouter.put('/delete', deleteAdminController);

export { adminsRouter };
