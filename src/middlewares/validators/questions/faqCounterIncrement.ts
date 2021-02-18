import * as Joi from 'joi';
import express from 'express';
import { createValidator } from 'express-joi-validation';

const router = express.Router();

const validator = createValidator();

const querySchema = Joi.object({
    name: Joi.string().required(),
});

router.put('/', validator.query(querySchema));

export default router;
