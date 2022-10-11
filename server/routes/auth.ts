import { Router } from "express";
import { authAuthenticate, authCookies, authDeleteCookies, authForgotPassword, authIdentify, authLogin, authRegister, authVerify } from "../controllers/authController";
import verifyToken from "../middleware/auth";

const router = Router();

// @router GET auth/cookies
// @desc Get cookies
// @access Private
router.get('/cookies', authCookies)

// @router DELETE auth/cookies
// @desc Delete cookies
// @access Private
router.delete('/cookies', authDeleteCookies)

// @router GET auth
// @desc Authenticate user
// @access Public
router.get('/', verifyToken, authAuthenticate)

// @router POST auth/register
// @desc Register user
// @access Public
router.post("/register", authRegister)

// @router GET auth/verify/:userId/:uniqueString
// @desc Verify email
// @access Public
router.post("/verify/:userId/:uniqueString", authVerify)

// @router GET auth/identify
// @desc Identify user to reset password
// @access Public
router.post("/identify", authIdentify)

// @router GET auth/resetpassword/:userId/:uniqueString
// @desc Forgot password
// @access Public
router.post("/resetpassword/:userId/:uniqueString", authForgotPassword)

// @router GET auth/login
// @desc Login user
// @access Public
router.post('/login', authLogin)

export default router;
