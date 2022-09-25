/* eslint-disable import/no-cycle */
import { Router } from 'express';
import {
    newFolder,
    moveFile,
    getFolders,
    findUser,
    getFile,
    deletAccount,
    swapFile,
    backToResume,
    getAllResumes,
} from '../controller/functions';
import { isAuth } from '../server/middleware/isAuthExist';

const router = Router();

router.route('/folder').post(isAuth, newFolder).get(isAuth, getFolders);
router.route('/folder/:id').get(isAuth, getFile);
router.route('/file').post(isAuth, moveFile);
router.route('/user').get(isAuth, findUser);
router.route('/delete').get(isAuth, deletAccount);
router.route('/swap').post(isAuth, swapFile);
router.route('/backToResume').post(isAuth, backToResume);
router.route('/resumes').get(isAuth, getAllResumes);

export default router;
