/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import { UserBody } from 'src/routes/types';
import { catchAsync, AppError } from '../../utils';
// eslint-disable-next-line import/no-cycle
import { prisma } from '../../server/index';

export const newFolder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        select: {
            folder: true,
        },
        where: {
            email: req.body.email,
        },
    });
    if (!user) {
        return next(new AppError('user not found', 404));
    }

    const data = await prisma.user.update({
        where: {
            email: req.body.email,
        },
        data: {
            folder: {
                create: [
                    {
                        name: req.body.data.name,
                        File: {},
                    },
                ],
            },
        },
    });

    return res.status(200).json({
        ok: true,
        message: 'folder was created successfully',
        data,
    });
});

export const userControl = async (body: UserBody) => {
    const checkUser = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });
    if (checkUser) {
        return checkUser;
    }
    const response = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            folder: {},
        },
    });
    return response;
};
