import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/google', passport.authenticate('google'));
router.get('/google/redirect', passport.authenticate('google'), (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        user: req.user,
    });
});
export default router;
