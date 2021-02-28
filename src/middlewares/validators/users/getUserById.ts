import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

import { buildValidationErrorResponse } from '../../../utils';

export default (req: Request, res: Response, next: NextFunction): void => {
  const paramsSchema = Joi.object({
    id: Joi.number().required(),
  });

  const { error: paramsErrors } = paramsSchema.validate(req.params);

  if (paramsErrors) {
    res.status(400).json(buildValidationErrorResponse({ paramsErrors }));
  } else {
    next();
  }
};
