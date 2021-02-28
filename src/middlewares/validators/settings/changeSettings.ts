import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const bodySchema = Joi.object({
    value: Joi.string().required(),
    name: Joi.string().required(),
  });

  const { error: bodyErrors } = bodySchema.validate(req.body);

  if (bodyErrors) {
    res.status(400).json(buildValidationErrorResponse({ bodyErrors }));
  } else {
    next();
  }
};
