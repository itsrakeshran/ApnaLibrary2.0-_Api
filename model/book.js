import mongoose from "mongoose";



const userBook= new mongoose.Schema(
    {
        bookId:{
            type:String,
            unique:true,
            require:true
        },
        title:{
            type:String,
            unique:true,
            require:true
        },
        author:{
            type:String,
            require:true
        },
        branch:{
            type:String,
            require:true
        },
        publicationYear:{
            type:Number,
            require:true
        },
        availableCopies:{
            type:Number,
            require:true
        }
    }
    
);


const Book= mongoose.model('Book',userBook);
export default Book;