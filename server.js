import express from "express";
import expressWinston from "express-winston";
import { transports, format } from "winston";

const app = express();
import logger from "./logger.js";

//transport is a place you want to save your logs
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

app.get("/", (req, res) => {
  logger.info("this is an info message");
  res.json({
    message: "Message received",
  });
});

app.get("/400", (req, res) => {
  logger.warn("This is a warning message");
  res.status(400).json({
    message: "Message received",
  });
});

app.get("/500", (req, res) => {
  res.status(500).json({
    message: "Message received",
  });
});

app.use("/error", (req, res) => {
  throw new Error("Internal server error");
});

const myFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: "logInternalErrors.log",
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), myFormat),
  })
);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
