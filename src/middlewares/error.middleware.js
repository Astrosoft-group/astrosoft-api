module.exports = (err,req,res,next)=>{
    console.log(err)
    const statusCode = err.code || 500
    const errorStack = process.env.NODE_ENV === "development"?err.stack:'Contact the developers to know more about this error'
    res.status(statusCode).json({
        success:false,
        body:{
            status:'Something went wrong',
            code:statusCode,
            data:{
                msg:err.message,
                stack:errorStack,
                value:err.details?.value,
                path:err.details?.path,
                field:err.details?.field
            }
        }
    })
}