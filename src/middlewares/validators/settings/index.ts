import { Router } from 'express';

import changeSettingsMiddleware from './changeSettings';
import getSettingsValueMiddleware from './getSettingsValue';

const settingsValidatorsMiddleware = Router();

settingsValidatorsMiddleware.use('/change', changeSettingsMiddleware);
settingsValidatorsMiddleware.use('/get', getSettingsValueMiddleware);

export default settingsValidatorsMiddleware;
