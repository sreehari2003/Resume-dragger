/* eslint-disable import/no-cycle */
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/appError';
import AuthRoute from '../routes/auth';
import userActions from '../routes/actions';

dotenv.config();
require('../controller/auth/passport');

export const app: Express = express();
export const prisma = new PrismaClient();

async function main() {
    // Connect the client
    await prisma.$connect();
    // eslint-disable-next-line no-console
    console.log('Connected to Prisma and mongoDB');
}
main();

app.use(
    cors({
        origin: ['http://127.0.0.1:5173'],
        credentials: true,
    })
);

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(morgan('dev'));

// "/" route to verify the app working
app.get('/', (_req, res: Response) => {
    res.status(200).json({
        ok: true,
        message: 'app running succesfully',
    });
});

app.use('/auth', AuthRoute);
app.use('/api', userActions);

// all = get,post,etc etc requests
app.all('*', (req: Request, _res: Response, next: NextFunction) => {
    next(new AppError(`The requested page ${req.originalUrl} was not found`, 404));
});

interface ErrorWithStatus extends Error {
    status: string;
    statusCode: number;
}

// global error handler
app.use((err: ErrorWithStatus, _req: Request, res: Response) => {
    // eslint-disable-next-line no-param-reassign
    err.statusCode = err.statusCode || 500;
    // eslint-disable-next-line no-param-reassign
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        ok: false,
        status: err.status,
        message: err.message,
    });
});
