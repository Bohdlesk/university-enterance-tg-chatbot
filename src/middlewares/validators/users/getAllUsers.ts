import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const querySchema = Joi.object({
    username: Joi.string(),
    name: Joi.string(),
    phone_number: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
    type_name: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    role_name: Joi.string(),
    city: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    state: Joi.object(),
  });

  const { error: queryErrors } = querySchema.validate(req.query);
  console.log('🚀 ~ file: getAllUsers.ts ~ line 18 ~ queryErrors', queryErrors);

  if (queryErrors) {
    res.status(400).json(buildValidationErrorResponse({ queryErrors }));
  } else {
    next();
  }
};
