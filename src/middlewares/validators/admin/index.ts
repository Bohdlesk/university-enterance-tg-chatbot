import { Router } from 'express';

import addAdminMiddleware from './addAdmin';
import deleteAdminValueMiddleware from './deleteAdmin';

const adminsValidatorsMiddleware = Router();

adminsValidatorsMiddleware.use('/add', addAdminMiddleware);
adminsValidatorsMiddleware.use('/delete', deleteAdminValueMiddleware);

export default adminsValidatorsMiddleware;
