import express from 'express'
import {deleteUser,updateUser,getUser,getUsers,noDues, getStudents, getLibrarian, createUser,blockUser} from '../controller/user.js';
import { verifyToken,verifyAdmin } from '../otherFunction/veryToken.js';
const router=express.Router();

router.get('/',getUsers);
router.post('/',createUser);
router.patch('/block',blockUser);
router.get('/students',getStudents);
router.get('/librarians',getLibrarian);
router.get('/:id',getUser);
router.put('/:id',updateUser);
router.delete('/:email',deleteUser);
router.post('/chekdues',noDues)

export default router;
