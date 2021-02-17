import { Router } from 'express';

import {
  changeSettingsController,
  getSettingsValueController,
} from '../controllers';

const settingsRouter = Router();

settingsRouter.put('/change', changeSettingsController);
settingsRouter.get('/get', getSettingsValueController);

export { settingsRouter };
