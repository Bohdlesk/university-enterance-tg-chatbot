import { Request, Response } from 'express';
import { BotSetting } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedFAQ = await BotSetting.update({ value: req.body.value }, {
      where: {
        name: req.body.name,
      },
      returning: true,
    });
    if (!updatedFAQ[0]) {
      res.status(404).json({
        status: 'error',
        message: `The value has not been updated, check value setting name: ${req.body.name}`,
      });
    } else {
      res.status(200).json({
        status: 'success',
        faq: updatedFAQ[1][0],
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
