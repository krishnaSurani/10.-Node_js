const schema = require("../model/schema");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");

module.exports.register = async (req, res) => {
    let user = await schema.findOne({ email: req.body.email })
    
    if (user) {
        return res.status(200).json({ msg: "User Already Existed" })
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);

    await schema.create(req.body).then((data) => {
        return res.status(200).json({ msg: "User successfully added..", user: data })
    })
    
}

module.exports.login=async(req,res)=>{
    console.log(req.body);
    let user=await schema.findOne({email:req.body.email});

    if(!user)
    {
          return res.status(200).json({ msg: "User not found !",code:1804})
    }
    if(await bcrypt.compare(req.body.password,user.password))
    {
        const token=jwt.sign({user},"kp",{expiresIn:"1h"});
        return res.status(200).json({msg:"User logged in successfully !",code:1612,token:token})
        
    }
    else{
        return res.status(200).json({msg:"User password is wrong!",code:901})
    }
    
}

module.exports.allAdmin=async(req,res)=>{
    await schema.find({}).then((data)=>{
        res.status(200).json({msg:"All data is here !",data:data})
    })
}