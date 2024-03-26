import 'express-async-errors';
import http from 'node:http';

import cors from 'cors';
import express from 'express';

import { errorHandler } from 'middlewares/error.middleware';
import { notFoundHandler } from 'middlewares/not-found.middleware';
import { PORT } from 'shared/config';
import { Logger } from 'utils/logger';

import { RegisterRoutes } from './routes';

const logger = new Logger('app');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);
app.use('/docs', express.static('build'));

app.use(notFoundHandler);
app.use(errorHandler);

const server = http.createServer(app).listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server is closed');
      process.exit(0);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
