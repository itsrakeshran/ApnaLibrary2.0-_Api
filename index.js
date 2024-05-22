import express from 'express';
import {dbConfing} from './dbConfig.js'
import user from './router/user.js'
import auth  from './router/auth.js'
import book from './router/book.js'
import bookTransaction from './router/transaction.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

//Constant
const PORT=8000;
const DBURL='mongodb://127.0.0.1:27017/librarymanagement';
const app=express();

// middle ware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))
app.use(cookieParser())
app.use(express.json());
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/book',book)
app.use('/api/booktransaction',bookTransaction);


//error handler middle ware
app.use((err,req,res,next)=>{
    const errStatus= err.status || 500;
    const errMessage= err.Message || "Some went wrong at Server side!";

    return res.status(errStatus).json({
        sucess:"False",
        status:errStatus,
        message: errMessage,
        stack: err.stack
    })

})

//check plain local host
app.get('/',(req,res)=>{
    res.send("Server is connected Sucess fully");
});

//server start
app.listen(PORT,()=>{
    dbConfing(DBURL);
    console.log(`Server is runing on: ${PORT}`)
})