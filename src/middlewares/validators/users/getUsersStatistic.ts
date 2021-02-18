import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const querySchema = Joi.object({
  type_name: Joi.number(),
  role_name: Joi.number(),
  city: Joi.string(),
});

router.get('/', validator.query(querySchema));

export default router;
