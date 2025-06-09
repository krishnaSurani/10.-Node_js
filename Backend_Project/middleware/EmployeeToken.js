const jwt=require("jsonwebtoken");

const employeeToken=(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token)
    {
        return res.status(404).json({msg:"token not found"});
    }
    let decode=jwt.verify(token,"employee");
    req.user=decode;
    next()
}
module.exports=employeeToken;