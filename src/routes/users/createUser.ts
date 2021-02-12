import express from 'express';
import { User } from '../../models';

const createUserRouter = express.Router();

createUserRouter.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { createUserRouter };
