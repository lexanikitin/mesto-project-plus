import winston from "winston";
import expressWinston from "express-winston";

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "logs/request.log",
    }),
  ],
  format: winston.format.json(),
});

export default requestLogger;
