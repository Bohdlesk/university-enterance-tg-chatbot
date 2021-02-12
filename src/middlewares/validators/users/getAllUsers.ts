import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const querySchema = Joi.object({
  id: Joi.number(),
  tg_id: Joi.number(),
  tg_name: Joi.string(),
  phone_number: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
  type_id: Joi.number(),
  role_id: Joi.number(),
  city: Joi.string(),
  state: Joi.object(),
});

router.get('/', validator.query(querySchema));

export default router;
