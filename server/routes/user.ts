import {Router} from 'express';
import { userFind, userGet } from '../controllers/userController';
import verifyToken from '../middleware/auth';

const router = Router()

// @router GET api/user
// @desc get all users
// @access Private
router.get('/', verifyToken, userGet)

// @router GET api/user/:userId
// @desc find user
// @access Private
router.get('/:userId', verifyToken, userFind)

export default router