import express from 'express'
import {createBook,deleteBook,updateBook, getBook, getBooks} from '../controller/book.js';
import {verifyToken,verifyAdmin,verifyStudent} from '../otherFunction/veryToken.js'

const router=express.Router();

router.get('/',getBooks);
router.get('/:id',getBook);
router.post('/',createBook);
router.put('/:id',updateBook);
router.delete('/:id',deleteBook);

export default router;
