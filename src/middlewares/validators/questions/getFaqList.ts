import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const querySchema = Joi.object({
  id: Joi.string(),
  questions_amount: Joi.number(),
}).xor('id', 'questions_amount');

router.get('/', validator.query(querySchema));

export default router;
