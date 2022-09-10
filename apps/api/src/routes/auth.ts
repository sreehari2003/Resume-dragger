/* eslint-disable import/no-cycle */
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { UserSession } from './types';
import { userControl } from '../controller/functions';

const router = Router();

router.get('/google', passport.authenticate('google'));
router.get(
    '/google/redirect',
    passport.authenticate('google', {
        session: true,
        scope: ['profile', 'email'],
        failureRedirect: `${process.env.API_URL}?fail=true`,
    }),
    async (req: Request, res: Response) => {
        const sess = req.user as UserSession;

        const user = {
            name: sess.displayName,
            email: sess.emails[0].value,
            picture: sess.photos[0].value,
        };
        const newUser = await userControl(user);
        const token = jwt.sign(
            {
                data: newUser.id,
            },
            'secret',
            {}
        );
        res.redirect(`${process.env.CLIENT_URL}/resume?id=${token}`);
    }
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return next(null);
    });

    res.redirect(`${process.env.CLIENT_URL}?logout=true`);
});

export default router;
