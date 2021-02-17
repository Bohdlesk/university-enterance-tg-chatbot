import { Request, Response } from 'express';
import { BotSetting } from '../../models';

export default async (req: Request, res: Response): Promise<Response> => {
  try {
    const updatedFAQ = await BotSetting.update({ value: req.body.value }, {
      where: {
        name: req.body.name,
      },
      returning: true,
    });
    if (!updatedFAQ[0]) {
      throw new Error(`The value has not been updated, check value setting name: ${req.body.name}`);
    }
    return res.status(200).json({
      status: 'success',
      faq: updatedFAQ[1][0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
