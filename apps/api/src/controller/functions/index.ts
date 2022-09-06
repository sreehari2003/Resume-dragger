/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import { UserBody } from 'src/routes/types';
import { catchAsync, AppError } from '../../utils';
// eslint-disable-next-line import/no-cycle
import { prisma } from '../../server/index';

interface MongoUser {
    id: string;
}

export const newFolder = catchAsync(async (req: Request, res: Response) => {
    const Authuser = req.user as MongoUser;
    await prisma.user.update({
        where: {
            id: Authuser.id,
        },
        data: {
            folder: {
                create: [
                    {
                        name: req.body.name,
                        File: {},
                    },
                ],
            },
        },
    });
    const folders = await prisma.folder.findMany({
        where: {
            userId: Authuser.id,
        },
    });

    return res.status(200).json({
        ok: true,
        message: 'folder was created successfully',
        data: folders,
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

export const moveFile = catchAsync(async (req: Request, res: Response) => {
    const { data } = req.body;
    const newFile = await prisma.user.update({
        where: {
            email: data.email,
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
    return res.status(200).json({ ok: true, data: newFile });
});

export const getFolders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as MongoUser;
    if (!user) {
        return next(new AppError('user does not exist', 401));
    }
    const folders = await prisma.folder.findMany({
        where: {
            userId: user.id,
        },
    });
    return res.status(200).json({
        ok: true,
        data: folders,
    });
});
