import 'dotenv/config';
import cors from 'cors';
import express, { Errback, NextFunction, Request, Response } from 'express';
import router from './routes';
import psql from './database';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router);

psql.connect();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Page Not Found' });
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: 'Internal Error' });
});

export default app;
