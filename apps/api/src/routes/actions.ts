/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { newFolder, moveFile, getFolders } from '../controller/functions';
import { isAuth } from '../server/middleware/isAuthExist';

const router = Router();

router.route('/folder').post(isAuth, newFolder).get(isAuth, getFolders);
router.route('/file').post(isAuth, moveFile);

export default router;
