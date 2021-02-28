/* eslint-disable @typescript-eslint/no-unused-vars */

import winston from 'winston';
import { logger, FilterRequest, FilterResponse } from 'express-winston';
import { IncomingHttpHeaders } from 'http';

const authFilter = (req: FilterRequest, propName: string):
  FilterResponse | IncomingHttpHeaders => {
  if (propName !== 'headers') {
    return req[propName];
  }

  const { 'pass-hash': passHash, ...rest } = req.headers;
  return rest;
};

export default logger({
  transports: [
    new winston.transports.Console(),
  ],
  requestFilter: authFilter,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple(),
  ),
  expressFormat: true,
  colorize: false,
  statusLevels: true,
  skip: (req, res) => (
    process.env.NODE_ENV === 'production'
      ? res.statusCode < 300
      : false
  ),
});
