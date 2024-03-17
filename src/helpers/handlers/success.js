
module.exports = (data,msg)=>(res)=>{
    res.status(200).json({
        success:true,
        body:{
            code:200,
            status:'success',
            msg:msg,
            data
        }
    }) 
}