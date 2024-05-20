import mongoose from "mongoose";

export const dbConfing = async(DBURL)=>{
        try{
            await mongoose.connect(DBURL)
            console.log("Database is connected succesfuly")
        }catch(err){
            console.log("Database is connected Error", err)
        }
}