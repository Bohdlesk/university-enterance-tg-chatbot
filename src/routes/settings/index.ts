import { Router } from 'express';
import { changeSettingsRouter } from './changeSettings';
import { getSettingsValueRouter } from './getSettingsValue';

const settingsRouter = Router();

settingsRouter.use('/change', changeSettingsRouter);
settingsRouter.use('/get', getSettingsValueRouter);

export { settingsRouter };
