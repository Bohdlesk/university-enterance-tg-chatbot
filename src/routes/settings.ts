import { Router } from 'express';

import * as constrollers from '../controllers/settings';
import * as validators from '../middlewares/validators/settings';

const settingsRouter = Router();

settingsRouter.put(
  '/change',
  validators.changeSettingsValidatorMiddleware,
  constrollers.changeSettingsController,
);
settingsRouter.get(
  '/get',
  validators.getSettingsValueValidatorMiddleware,
  constrollers.getSettingsValueController,
);

export { settingsRouter };
