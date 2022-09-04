import { prisma } from '../index';

export const isExist = async (email: string) => {
    const result = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return result;
};
