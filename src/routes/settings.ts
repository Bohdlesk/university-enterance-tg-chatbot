import { Router } from 'express';

import * as controllers from '../controllers/settings';
import * as validators from '../middlewares/validators/settings';

const settingsRouter = Router();

settingsRouter.put(
  '/change',
  validators.changeSettingsValidatorMiddleware,
  controllers.changeSettingsController,
);
settingsRouter.get(
  '/get',
  validators.getSettingsValueValidatorMiddleware,
  controllers.getSettingsValueController,
);

export { settingsRouter };
