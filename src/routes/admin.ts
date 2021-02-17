import { Router } from 'express';
import { addAdminController, getAdminListController, deleteAdminController } from '../controllers';

const adminsRouter = Router();

adminsRouter.put('/add', addAdminController);
adminsRouter.put('/list', getAdminListController);
adminsRouter.delete('/delete', deleteAdminController);

export { adminsRouter };
