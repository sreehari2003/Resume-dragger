/* eslint-disable import/no-cycle */
import { Router } from 'express';
import { newFolder, moveFile, getFolders, findUser } from '../controller/functions';
import { isAuth } from '../server/middleware/isAuthExist';

const router = Router();

router.route('/folder').post(isAuth, newFolder).get(isAuth, getFolders);
router.route('/file').post(isAuth, moveFile);
router.route('/user').get(isAuth, findUser);

export default router;
