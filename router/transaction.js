import express from 'express'
import {Transaction} from '../controller/bookTransaction.js';
import {verifyLibrarian} from '../otherFunction/veryToken.js'
const router=express.Router();


router.post('/',Transaction);

export default router;
