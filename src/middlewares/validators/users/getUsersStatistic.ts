import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const querySchema = Joi.object({
  type_name: Joi.string(),
  role_name: Joi.string(),
  city: Joi.string(),
});

router.get('/', validator.query(querySchema));

export default router;
