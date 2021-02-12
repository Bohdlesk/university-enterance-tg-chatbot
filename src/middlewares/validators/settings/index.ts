import { Router } from 'express';

import changeSettingsMiddleware from './changeSettings';
import getSettingsValueMiddleware from './getSettingsValue';

const settingsValidatorsMiddleware = Router();

settingsValidatorsMiddleware.use('/', changeSettingsMiddleware);
settingsValidatorsMiddleware.use('/', getSettingsValueMiddleware);

export default settingsValidatorsMiddleware;
