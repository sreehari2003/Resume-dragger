/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { UserBody } from 'src/routes/types';
import { catchAsync } from '../../utils';
import AppError from '../../utils/appError';
// eslint-disable-next-line import/no-cycle
import { prisma } from '../../server/index';

interface MongoUser {
    id: string;
}
interface US {
    name: string;
    resume: string;
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
        select: {
            id: true,
            resume: true,
        },
    });
    if (checkUser) {
        return checkUser;
    }
    const URL = 'https://api.jsonbin.io/v3/b/603e095481087a6a8b944bd4';
    const accessKyy = process.env.TOKEN!;
    const { data } = await axios.get(URL, {
        headers: {
            'X-Master-Key': accessKyy.replaceAll('@', '$'),
        },
    });

    const obj: US[] = [];
    data.record.map((el) => obj.push({ name: el.name, resume: el.resume }));

    const response = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            folder: {},
            // adding the provided resumes to user db so we can manipulate it
            resume: {
                create: obj,
            },
        },
    });

    return response;
};

export const moveFile = catchAsync(async (req: Request, res: Response) => {
    const { file, name } = req.body;

    const exits = await prisma.folder.findUnique({
        where: {
            name: file,
        },
        select: {
            File: true,
        },
    });
    if (exits) {
        const isExists = exits?.File.find((el) => el.name === name);
        if (isExists) {
            return res.status(200).json({
                ok: false,
                message: 'file already exist',
            });
        }
    }

    const newFile = await prisma.folder.update({
        where: {
            name: file,
        },
        data: {
            File: {
                create: [
                    {
                        name,
                    },
                ],
            },
        },
    });
    return res.status(200).json({ ok: true, data: newFile, message: 'file moved successfully' });
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
        message: 'request successfll',
    });
});

export const findUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as MongoUser;
    const result = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            email: true,
            id: true,
            folder: true,
            resume: true,
        },
    });
    if (!result) {
        return next(new AppError('user does not exist', 401));
    }
    return res.status(200).json({
        ok: true,
        message: 'query sucessfull',
        data: result,
    });
});

export const getFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
        return next(new AppError('couldnt find the folder name', 401));
    }
    const files = await prisma.folder.findUnique({
        where: {
            name: id,
        },
        select: {
            File: true,
        },
    });
    return res.status(200).json({
        ok: true,
        data: files?.File,
        message: 'Query was completed',
    });
});

export const deletAccount = catchAsync(async (req: Request, res: Response) => {
    const user = req.user as MongoUser;
    await prisma.user.delete({
        where: {
            id: user.id,
        },
        select: {
            folder: true,
        },
    });

    return res.status(200).json({
        ok: true,
        message: 'Account was deleted',
    });
});

export const swapFile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const user = req.user as MongoUser;
    const folders = await prisma.folder.findUnique({
        where: {
            name: req.body.folder,
        },
    });

    if (!folders) {
        return next(new AppError('couldnt find the folder', 400));
    }

    const array = await prisma.file.findMany({
        where: {
            folderId: folders.id,
        },
    });
    if (!array) {
        return next(new AppError('couldnt find the folder', 400));
    }
    const temp = array[req.body.initialIndex];
    array[req.body.initialIndex] = array[req.body.finalIndex];
    array[req.body.finalIndex] = temp;
    const dara = await prisma.folder.update({
        where: {
            name: req.body.folder,
        },
        data: {
            File: {
                set: array,
            },
        },
    });

    return res.status(200).json({ ok: true, data: dara, message: 'sort succesfull' });
});
