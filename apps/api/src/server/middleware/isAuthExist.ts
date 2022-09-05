/* eslint-disable import/no-cycle */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../../utils/catchAsync';
import { prisma } from '../index';
import { AppError } from '../../utils/appError';

// eslint-disable-next-line consistent-return
export const isAuth = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
    // 1)get the token and check if its there  ?
    let token;
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // eslint-disable-next-line prefer-destructuring
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next(new AppError('user not logged in ', 401));
    }

    // 2)verify the token !

    interface Token {
        data: string;
    }

    const decoded = jwt.verify(token, 'secret') as Token;
    if (!decoded) {
        return next(new AppError('user does not exist', 401));
    }

    // 3)check user exist ?

    const checkUser = await prisma.user.findUnique({
        where: {
            id: decoded.data as string,
        },
    });

    if (!checkUser) {
        return next(new AppError('user does not exist', 401));
    }

    // grant access to protected route
    req.user = checkUser;
    next();
});
