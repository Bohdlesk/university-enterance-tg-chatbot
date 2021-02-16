import express from 'express';
import { User } from '../../models';
import { UserRoles } from '../../models/UserRole';

const addAdminRouter = express.Router();

addAdminRouter.put('/', async (req, res) => {
  try {
    const telegramId = req.query.tg_id;
    const adminAdded = await User.update({ role_id: UserRoles.admin }, {
      where: {
        tg_id: telegramId,
      },
      returning: true,
    });
    if (!adminAdded[0]) {
      throw new Error('User Does not exist');
    }
    res.status(200).json({
      status: 'success',
      user: adminAdded[1][0].get(),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export { addAdminRouter };
