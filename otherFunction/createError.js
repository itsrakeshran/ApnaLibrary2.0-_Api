export const createError = (stat,message)=>{
    let err= new Error();
    err.status=stat;
    err.message=message
    return err;
}

