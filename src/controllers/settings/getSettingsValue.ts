import { Request, Response } from 'express';
import { BotSetting } from '../../models';

export default async (req: Request, res: Response): Promise<void> => {
  try {
    let params = {};
    if (req.query.name) {
      params = {
        where: {
          name: req.query.name,
        },
      };
    }
    const settingsValue = await BotSetting.findAll(params);
    if (settingsValue.length === 0) {
      throw new Error(`Not found, check value setting name: ${req.query.name}`);
    }
    res.status(200).json({
      status: 'success',
      settings: settingsValue[0],
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error,
    });
  }
};
