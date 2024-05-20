import bookTransaction from '../model/bookTransaction.js'
import User from '../model/user.js'
import Book from '../model/book.js'
import { v4 as uuidv4 } from 'uuid';
import {createError} from '../otherFunction/createError.js'


// create transactioin
export const Transaction=async(req,res,next)=>{
    //ids
    const studentId=req.body.email;
    const bookId=req.body.bookId;
    const transactionId=uuidv4();

    //verify student id
    // const chekUser=await User.find({email==studentId});
    const chekUser = await User.find({ email: studentId });
    if(!chekUser){
        return next(createError(400,"Invalid User Id"))
        // res.status(400).send();
        // return;
    }

    //verify book id
    const checkBook= await Book.find({bookId:bookId});
    if(!checkBook){
        return next(createError(400,"Book id is invalid"))
        // res.status(400).send("Book id is invalid")
        // return next(create);
    }

    //check book in user book array in case of return 
    if(req.body.type==='Returned'){
        const updatedResult= await User.updateOne({email: studentId},{$pull:{ borrowedBooks:{bookId:bookId}}});
        if(updatedResult.nModified === 0){
            return next(createError(400,"Book not found in user array"))

        }
    }

    //add book in User book array in case of borrowed
    if(req.body.type==='Borrowed'){
        const updatedResult= await User.updateOne({ email: studentId },{$push:{ borrowedBooks:{"bookId":bookId,"transactionId":transactionId}}});
        if(updatedResult.nModified === 0){
            return next(createError(400,"Book didn't append in user Array"))

        }
    }

    try{
        let currentDate = new Date();
        let todayDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
        const newTransaction= new bookTransaction({
            transactionId,
            "studentId":req.body.studentId,
            "bookId":req.body.bookId,
            "borrowDate":req.body.type==='Borrowed'?todayDate:'',
            "returnDate":req.body.type==='Returned'?todayDate:'',
            "type":req.body.type
        });

        let succesTrans= await newTransaction.save();

        if(!succesTrans){
            return next(createError(400,"Transaction is not sucessful"))
            // res.status(400).send("Transaction is not sucessful")
            // return;
        }

        res.status(200).send("Transaction Sucessful");

    }catch(err){
        next(err);
        // res.status(400).json({"Use book array is didn't update":err})
        // return;
    }
};