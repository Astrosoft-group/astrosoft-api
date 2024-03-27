
module.exports = (data,code,msg)=>(res)=>{
    res.status(code).json({
        success:true,
        body:{
            code,
            status:'success',
            msg:msg,
            data
        }
    }) 
}