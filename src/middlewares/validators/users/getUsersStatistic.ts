import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const querySchema = Joi.object({
    type_name: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    role_name: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
    city: Joi.alternatives().try(Joi.array().items(Joi.string()), Joi.string()),
  });

  const { error: queryErrors } = querySchema.validate(req.query);

  if (queryErrors) {
    res.status(400).json(buildValidationErrorResponse({ queryErrors }));
  } else {
    next();
  }
};
