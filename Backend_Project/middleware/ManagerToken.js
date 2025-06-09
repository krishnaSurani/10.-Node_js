const jwt=require("jsonwebtoken");

const managerToken=(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token)
    {
        return res.status(404).json({msg:"token not found"});
    }
    let decode=jwt.verify(token,"manager");
    req.user=decode;
    next()
}
module.exports=managerToken;