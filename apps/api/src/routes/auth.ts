/* eslint-disable import/no-cycle */
import { Request, Response, Router } from 'express';
import passport from 'passport';
import { userControl } from '../controller/functions';
import { UserBody } from './types';

const router = Router();

router.get('/google', passport.authenticate('google'));
router.get(
    '/google/redirect',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
    }),
    (req: Request, res: Response) => {
        if (!req.user) {
            res.status(401).json({
                ok: false,
                message: 'login/signup failed',
            });
        }
        const currentUser = req.user as UserBody;
        const user = userControl(currentUser);
        if (!user) {
            res.status(401).json({
                ok: false,
                message: 'login/signup failed',
            });
        }
        res.status(200).json({
            ok: true,
            user,
            message: 'user was authenticated successfully',
        });
    }
);
export default router;
