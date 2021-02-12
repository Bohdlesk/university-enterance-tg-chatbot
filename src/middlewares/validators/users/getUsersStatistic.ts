import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const querySchema = Joi.object({
  type_id: Joi.number(),
  role_id: Joi.number(),
  city: Joi.string(),
});

router.get('/', validator.query(querySchema));

export default router;
