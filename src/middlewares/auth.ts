import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

import { pass } from '../const';

const hash = crypto.createHash('sha256').update(pass).digest('hex');

export default (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers['pass-hash'] && hash === req.headers['pass-hash']) {
    next();
    return;
  }

  res.status(401).json({
    message: 'Failed to authorize',
  });
};
