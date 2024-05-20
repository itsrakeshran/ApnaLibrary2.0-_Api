import jwt from 'jsonwebtoken';
import { createError } from '../otherFunction/createError.js';
const JWTKEY = 'asdfghjkl';


export const verifyToken=(req,res,next)=>{
    console.log(req.cookies);
    const token = req.cookies.token;
    if(!token) {
        return next(createError(400,"you are not authenticated"));
    }
    jwt.verify(token,JWTKEY,(err,user)=>{
        if(err) return next(err);
        req.user=user
        next();
        // res.status(200).send("User verified");
    });
}

// verify Student
export const verifyStudent=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role==='student' || req.user.role==='admin'){
            next();
        }else {
            return next (createError(403,"You are not authorized Student!"))
        }
    })
}


// verify librarian
export const verifyLibrarian=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role==='librarian' || req.user.role==='admin'){
            next();
        }else {
            return next (createError(403,"You are not authorized Libraian!"))
        }
    })
}

// verify admin
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.role==='admin'){
            next();
        }else {
            return next (createError(403,"You are not authorized Admin!"))
        }
    })
}





