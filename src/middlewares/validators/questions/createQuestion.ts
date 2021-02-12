import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const bodySchema = Joi.object({
  question: Joi.string().required(),
});

router.post('/', validator.body(bodySchema));

export default router;
