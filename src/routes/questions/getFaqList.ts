import express from 'express';
import { FAQ } from '../../models';

const getFaqListRouter = express.Router();

getFaqListRouter.get('/', async (req, res) => {
  try {
    let where = {};
    if (req.query.name) {
      where = { name: req.query.name };
    }
    const params: object = {
      limit: req.query.questions_amount,
      order: [['stats', 'DESC']],
      where,
    };
    const questions: object = await FAQ.findAll(params);
    res.status(200).json({
      status: 'success',
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { getFaqListRouter };
