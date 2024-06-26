import User from '../model/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { createError } from '../otherFunction/createError.js';
import { json } from 'express';

const JWTKEY='asdfghjkl'

//create user

export const register=async(req,res,next)=>{
    // checkuseemail
    try{
        let foudUser= await User.find({email:req.body.email});
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
       
    }catch{
        next(err);
    }
    
    try{
        let foudUser= await User.find({email:req.body.email});
        if(foudUser){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                await User.updateOne({email:req.body.email},{$set:{password:hash}})
                res.status(200).send("User has been created");
                }else{
                    let error= new Error("user not foudn with this email id")
                    next(error);
                }
    }catch(err){
        next(err)
    }
};

//login user using password and email
export const login = async(req,res,next)=>{
    try{

        console.log(req.cookies);
        const findUser=await User.findOne({email:req.body.email});
        
        if(!findUser){
            next(createError(400, "User not found"))
        } 

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            findUser.password
        );

        if(!isPasswordCorrect) return next(createError(400,"Wrong Passwrod"));
        
        const token = jwt.sign({id:findUser._id, role:findUser.role},JWTKEY);

        const{password,role,email,...otherDetails}=findUser._doc;

        // res.cookie('token', token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to false during development
            sameSite: 'strict',
          });
        res.status(200).json({
            Message:"Login successful",
            token:token,
            role:findUser.role,
            email:findUser.email
        });

    }catch(err){
        next(err);
    } 
}


//fetch user using cookies 
export const cookieVerify = async (req, res, next) => {
    try {
        const token = req.body.token;
        console.log(token)
        const decoded = await jwt.verify(token, JWTKEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('No user found with this id');
        }
        // req.user = user;
        res.status(200).json(user);
        next();

    } catch (err) {
        next(createError(401, "Hello"));
    }
};