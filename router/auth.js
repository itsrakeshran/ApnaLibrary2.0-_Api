import express from 'express'
import {register, login, cookieVerify} from '../controller/auth.js';
const router=express.Router();



router.post('/', register);
router.post('/login', login);
router.post('/cookies', cookieVerify);

export default router;
