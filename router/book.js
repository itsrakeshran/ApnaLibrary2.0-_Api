import express from 'express'
import {createBook,deleteBook,updateBook, getBook, getBooks} from '../controller/book.js';
import {verifyToken,verifyAdmin,verifyStudent} from '../otherFunction/veryToken.js'

const router=express.Router();

router.get('/',verifyToken,getBooks);
router.get('/:id',verifyToken,getBook);
router.post('/',verifyAdmin,createBook);
router.put('/:id',verifyAdmin,updateBook);
router.delete('/:id',deleteBook);

export default router;
