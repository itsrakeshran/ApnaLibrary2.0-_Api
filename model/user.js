import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        mobile:{
            type:Number,
            unique:true,
            require:true
        },
        email:{
            type:String,
            unique:true,
            require:true
        },
        password:{
            type:String,
            require:false,
            default:null
        },
        role: {
            type: String,
            enum: ['admin', 'librarian', 'student'],
            default: 'student',
            require:true
        },
        borrowedBooks: [{
                bookId: {
                    type:String,
                },
                transactionId:{
                    type:String,
                    require:true
                }
            }],
        IsBlocked: {
            type:Boolean,
            default:false
        },
        MaxBooks:{
            type:Number,
            default:2
        } 
    }
);

const User= mongoose.model('User',userSchema);
export default User;

