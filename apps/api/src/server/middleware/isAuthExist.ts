import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../utils/appError';

export const isAuthExist = (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
        return new AppError('user not authenticated', 401);
    }
    return next();
};
