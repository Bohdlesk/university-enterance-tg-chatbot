import express from 'express';
import { User } from '../../models';

const deleteUserRouter = express.Router();

deleteUserRouter.delete('/', async (req, res) => {
  try {
    const isDeleted = await User.destroy({
      where: {
        tg_id: req.query.tg_id,
      },
    });
    if (!isDeleted) {
      throw new Error('User Does not exist');
    }
    res.status(200).json({
      status: 'success',
      info: `User ${req.query.tg_id} has been deleted`,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { deleteUserRouter };
