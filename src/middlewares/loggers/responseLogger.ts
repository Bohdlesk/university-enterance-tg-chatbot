import winston from 'winston';
import expressWinston from 'express-winston';

export default expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
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
