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
            folder: {
                include: {
                    File: true,
                },
            },
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
    const { resume, folder } = req.body;
    const user = req.user as MongoUser;
    const resumes = await prisma.resume.findFirst({
        where: {
            AND: {
                name: resume,
                userId: user.id,
            },
        },
    });

    if (!resumes) {
        return next(new AppError('couldnt find the resume', 400));
    }

    await prisma.resume.delete({
        where: {
            name: req.body.resume,
        },
    });

    const data = await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            folder: {
                update: {
                    where: {
                        name: folder,
                    },
                    data: {
                        File: {
                            create: {
                                name: resumes.name,
                            },
                        },
                    },
                },
            },
        },
    });

    return res.status(200).json({ ok: true, data, message: 'sort succesfull' });
});

export const backToResume = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user as MongoUser;
    const { resumename, folder } = req.body;
    if (!resumename || !folder) {
        return next(new AppError('Couldnt complte request', 400));
    }
    const response = await prisma.user.update({
        where: {
            id,
        },
        data: {
            folder: {
                update: {
                    where: {
                        name: folder,
                    },
                    data: {
                        File: {
                            delete: {
                                name: resumename,
                            },
                        },
                    },
                },
            },
            resume: {
                create: {
                    name: resumename,
                    resume: resumename,
                },
            },
        },
    });
    if (!response) {
        return next(new AppError('Couldnt complte request', 400));
    }
    return res.status(200).json({
        ok: true,
        message: 'Request completed successfully',
    });
});

export const getAllResumes = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user as MongoUser;
    const allRes = await prisma.resume.findMany({
        where: {
            userId: id,
        },
    });
    if (!allRes) {
        res.status(404).json({ ok: false, message: 'couldnt complete the request' });
    }
    return res.status(200).json({
        ok: true,
        message: 'Request completed successfully',
        data: allRes,
    });
});

export const Filetofile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user as MongoUser;
    const { init, final, file } = req.body;
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            folder: {
                update: {
                    where: {
                        name: init,
                    },
                    data: {
                        File: {
                            delete: {
                                name: file,
                            },
                        },
                    },
                },
            },
        },
    });
    await prisma.user.update({
        where: {
            id,
        },
        data: {
            folder: {
                update: {
                    where: {
                        name: final,
                    },
                    data: {
                        File: {
                            create: {
                                name: file,
                            },
                        },
                    },
                },
            },
        },
    });
    return res.status(200).json({
        ok: true,
        message: 'Request completed successfully',
    });
});
