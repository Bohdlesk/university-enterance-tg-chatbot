import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const querySchema = Joi.object({
    username: Joi.string().required(),
  });

  const { error: queryErrors } = querySchema.validate(req.query);

  if (queryErrors) {
    res.status(400).json(buildValidationErrorResponse({ queryErrors }));
  } else {
    next();
  }
};
