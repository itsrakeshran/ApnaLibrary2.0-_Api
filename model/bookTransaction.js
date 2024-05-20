import mongoose from "mongoose";

const bookTransactionSchema= new mongoose.Schema(
    {
        transactionId: {
            type:String,
            require:true,
            unique:true
        },
        studentId: {
            type:String,
            require:true
        },
        bookId: {
            type:String,
            require:true
        },
        borrowDate:{
            type:String,
            require:true
        },
        returnDate:{
            type:String,
            require:true
        },
        type:{
            type:String,
            enum: ['Returned', 'Borrowed'],
            require:true
        }
    }
);

const bookTransaction= mongoose.model('bookTransaction',bookTransactionSchema);
export default bookTransaction;
