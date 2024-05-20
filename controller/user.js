import User from '../model/user.js'
import {createError} from '../otherFunction/createError.js'

//delete user
// export const deleteUser = async(req,res,next)=>{
//     const userId =req.params.id;
//     try{
//         let findUser=await User.findByIdAndDelete(userId);
//         if(!findUser){
//             return next(createError(400,"User not Found"))
//             // res.status(400).send("User not found with this id"); 
//         } 
//         res.status(200).send("User Deleted Sucess fully"); 
        
//     }catch(err){
//         next(err)
//         // res.status(401).send("Delete user:",err);
//     }
// }

//update user
export const updateUser=async(req,res,next)=>{
    const userId =req.params.id;
    try{
        const updatedUser=await User.findByIdAndUpdate(userId,{$set:req.body},{new:true});
        if(!updateUser){
            return next(createError(400,"User not found with this id"))
        }
        res.status(200).json(updatedUser);
    }catch(err){
        next(err)
    }
}

//get user by id 
export const getUser=async(req, res, next)=>{
    const userId =req.params.id;
    try{
        const result=await User.findById(userId);
        if(!foundUser){
            return next(createError(400,"User not found with this id id"))
        }
        res.status(200).json(result);
    }catch(err){
        next(err)
    }
}




//get all Students
export const getStudents=async(req,res,next)=>{
    try{
        const foundUsers=await User.find({role:"student"}).select("name email borrowedBooks mobile IsBlocked");
        
        if(!foundUsers){
            return next(400,"User not found")
        }
        res.status(200).json(foundUsers);
    }catch(err){
        next(err);
    }
}

//get all librarian
export const getLibrarian=async(req,res,next)=>{
    try{
        const foundUsers=await User.find({role:"librarian"}).select("name email mobile IsBlocked");
        
        if(!foundUsers){
            return next(400,"User not found")
        }
        res.status(200).json(foundUsers);
    }catch(err){
        next(err);
    }
}



//get all User
export const getUsers=async(req,res,next)=>{
    try{
        const foundUsers=await User.find();
        if(!foundUsers){
            return next(400,"User not found")
        }
        res.status(200).json(foundUsers);
    }catch(err){
        next(err);
    }
}

// no Dues
export const noDues= async(req,res,next)=>{
    // console.log(req.body.email);
    // res.status(200).send("Hello")
    try{
        const foundUsers=await User.find({email:req.body.email}).select('borrowedBooks');
        if(!foundUsers){
            return next(400,"User not found")
        }
        const arrayLength = foundUsers[0].borrowedBooks.length;
        res.status(200).json(arrayLength);   
        // console.log(arrayLength);
       
    }catch(err){
        next(err);
    }
}

//create user
export const createUser=async(req,res,next)=>{
    try{
        const newUser = new User({
            name:req.body.name,
            mobile:req.body.mobile,
            email:req.body.email,
            role:req.body.role
        });

        await newUser.save();
        res.status(200).send("User has been created");

    }catch(err){
        next(err)
        // next(createError(400,))
        // res.status(400).json({"user creation Erro":err});
    }
};

///
export const blockUser=async(req,res,next)=>{
    try{
        await User.updateOne({email:req.body.email}, {$set:{IsBlocked : req.body.status}})
        res.status(200).send("User Block Sucessfully");
    }catch(err){
        next(err)
    }
};


export const deleteUser=async(req,res,next)=>{
    const userId =req.params.email;
    try{
        console.log(req.body.email)
        await User.deleteOne({email:userId})
        res.status(200).json({"message":"User Deleted Sucessfully","emali":req.body.email});
    }catch(err){
        next(err)
    }
};





