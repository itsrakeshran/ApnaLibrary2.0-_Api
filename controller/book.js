import Book from '../model/book.js';
import { createError } from '../otherFunction/createError.js';
import serialNumber from 'serial-number';
import {v4 as uuidv4} from 'uuid'

// const { v4: uuidv4 } = require('uuid');
// Generate a UUID (v4) with a 4-character segment

const mySerialNumber = uuidv4().split('-')[0];
console.log('Generated Serial Number (UUID):', mySerialNumber.toUpperCase());

//add Book
export const createBook=async(req,res,next)=>{
    const mySerialNumber = uuidv4().split('-')[0];
    const currentId=mySerialNumber.toUpperCase();
    req.body.bookId=currentId;

    const newBook= new Book (req.body);
    
    console.log(newBook);
    try{
        await newBook.save();
        res.status(200).send("Book has been created");

    }catch(err){
        next(err)
        // res.status(400).json({"Error in book creation:": err});
    }
}


//delete Book
export const deleteBook = async(req,res, next)=>{
    const bookId =req.params.id;
    try{
        let deletedbook=await Book.findByIdAndDelete(bookId);
        if(!deletedbook) return next(createError(400,"Book not found with this id"));
        res.status(200).send("Book has been deleted sucessfully");
    }catch(err){
        next(err);
        // res.status(400).json({"Error in adding Book":err});
    }
}


//update Book
export const updateBook = async(req,res,next)=>{
    const bookId = req.params.id;
    try{
        const updatedBook=await Book.findByIdAndUpdate(bookId,{$set:req.body},{new:true});

        if(!updateBook) return next(createError(400,"book not found with this id"));

        res.status(200).json(updatedBook);

    }catch(err){
        next(err);
        // res.status(400).send("Book not found");
    }
}


//get Book by id 
export const getBook=async(req,res,next)=>{
    const bookId =req.params.id;
    try{
        const foundBook=await Book.findById(bookId);
        if(!foundBook) return next(createError(400,"Book not Found"));
        res.status(200).json(foundBook);
    }catch(err){

        next(err);
        // res.status(400).json({"Error in find book by id":err})
    }
}

//get all book by id 
export const getBooks=async(req,res,next)=>{
    try{
        const foundBook=await Book.find();

        if(!foundBook) return next(createError(400,"Book not found"));

        res.status(200).json(foundBook);

    }catch(err){
        next(err);
        // res.status(400).json({"Book not found":err});
    }
}