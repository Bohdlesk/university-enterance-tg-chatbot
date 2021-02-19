import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const paramsSchema = Joi.object({
  id: Joi.number().required(),
});

router.get('/:id', validator.params(paramsSchema));

export default router;
