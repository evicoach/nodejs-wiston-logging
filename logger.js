import { createLogger, format, transports } from "winston";

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      level: "warn",
      filename: "./logs/warnings.log",
    }),
    new transports.File({
      level: "error",
      filename: "./logs/errors.log",
    }),
    new transports.File({
      level: "info",
      filename: "./logs/info.log",
    }),
  ],
  format: format.combine(
    format.json(),
    format.timestamp(),
    format.metadata(),
    format.prettyPrint()
  ),
});

export default logger;