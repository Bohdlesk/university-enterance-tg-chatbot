import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const bodySchema = Joi.object({
    username: Joi.string(),
    name: Joi.string(),
    phone_number: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
    type_name: Joi.string(),
    role_name: Joi.string(),
    city: Joi.string(),
    state: Joi.object(),
  }).min(1).message('body must have at least 1 key');

  const { error: bodyErrors } = bodySchema.validate(req.body);

  const querySchema = Joi.object({
    id: Joi.number().required(),
  });

  const { error: queryErrors } = querySchema.validate(req.query);

  if (bodyErrors || queryErrors) {
    res.status(400).json(buildValidationErrorResponse({ bodyErrors, queryErrors }));
  } else {
    next();
  }
};
