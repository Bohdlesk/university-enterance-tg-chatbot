import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const bodySchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string(),
  name: Joi.string().required(),
  phone_number: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/),
  type_name: Joi.string(),
  role_name: Joi.string(),
  city: Joi.string().required(),
  state: Joi.object().required(),
});

router.post('/', validator.body(bodySchema));

export default router;
