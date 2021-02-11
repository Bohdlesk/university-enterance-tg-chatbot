import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const bodySchema = Joi.object({
  tg_id: Joi.number().required(),
  tg_name: Joi.string().required(),
  phone_number: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
  type_id: Joi.number(),
  role_id: Joi.number(),
  city: Joi.string(),
  state: Joi.object().required(),
});

router.post('/', validator.body(bodySchema));

export default router;
