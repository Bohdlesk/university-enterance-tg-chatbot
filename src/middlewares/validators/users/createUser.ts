import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const bodySchema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string(),
    name: Joi.string(),
    phone_number: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
    type_name: Joi.string(),
    role_name: Joi.string(),
    city: Joi.string(),
    state: Joi.object(),
  });

  const { error: bodyErrors } = bodySchema.validate(req.body);

  if (bodyErrors) {
    res.status(400).json(buildValidationErrorResponse({ bodyErrors }));
  } else {
    next();
  }
};
