import { NextFunction, Request, Response } from 'express';

export const catchAsync = (fun: any) =>
    // eslint-disable-next-line func-names
    function (req: Request, res: Response, next: NextFunction) {
        fun(req, res, next).catch(next);
    };
