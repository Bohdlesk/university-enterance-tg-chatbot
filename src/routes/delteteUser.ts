import express from 'express';
import { User } from '../models';

const deleteUserRouter = express.Router();

deleteUserRouter.delete('/', async (req, res) => {
  try {
    if (req.body.tg_id === undefined) {
      throw new Error('Telegram id (tg_id) parameter is not found');
    }
    const isDeleted = await User.destroy({
      where: {
        tg_id: req.body.tg_id,
      },
    });
    if (!isDeleted) {
      throw new Error('User Does not exist');
    }
    res.status(200).json({
      status: 'success',
      info: `user ${req.body.tg_id} has been deleted`,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      error,
    });
  }
});

export { deleteUserRouter };
