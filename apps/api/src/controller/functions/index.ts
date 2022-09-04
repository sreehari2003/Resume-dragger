import { NextFunction, Request, Response } from 'express';
import { catchAsync, AppError } from '../../utils';
import { prisma } from '../../server/index';

export const newFolder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
        select: {
            Folder: true,
        },
        where: {
            email: req.body.email,
        },
    });
    if (!user) {
        return next(new AppError('user not found', 404));
    }
    // const folderIds = user?.Folder.map((el) => el);
    // const newData = [...folderIds, req.body.data];
    await prisma.user.update({
        where: {
            email: req.body.email,
        },
        data: {
            // Folder: newData,
        },
    });

    return res.status(200).json({
        ok: true,
        message: 'folder was updated successfully',
    });
});
