const schema=require("../model/schema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const mailer=require("../middleware/mailer");


module.exports.login=async(req,res)=>{
    console.log(req.body);
    let employee=await schema.findOne({email:req.body.email});
    if(!employee)
    {
        return res.status(200).json({msg:"User Not Found !"});
    }
    if(await bcrypt.compare(req.body.password,employee.password))
    {
        const token=jwt.sign({employee},"employee",{expiresIn:"5h"})
        // console.log(token);
        return res.status(200).json({msg:"User Logged in successfully..",token:token});
    }
    else{
        return res.status(200).json({msg:"Password is wrong !"})
    }
}

module.exports.profile=async(req,res)=>{
    console.log(req.user);
    const employee=await schema.findById(req.user.employee._id);
    if(!employee)
    {
        return res.status(200).json({msg:"Not a Employee"});
    }
    if(employee.role != "employee")
    {
        return res.status(200).json({msg:"Access Denied"});
    }
    res.status(200).json({msg:"Profile data shown",
         id:employee._id,
        username:employee.username,
        email:employee.email,
        phone:employee.phone,
        role:employee.role,
        managerId:employee.managerId
    })
}

module.exports.changePassword=async(req,res)=>{
    console.log(req.body)
    let employee=req.user.employee
    // console.log(employee);
    if(await bcrypt.compare(req.body.oldPassword,employee.password))
    {
        if(req.body.oldPassword != req.body.newPassword)
            {
                 if(req.body.newPassword == req.body.confirmPassword)
                    {
                    hashNewPassword=await bcrypt.hash(req.body.confirmPassword,10)

                    await schema.findByIdAndUpdate(employee._id,{password:hashNewPassword})
                    .then(()=>{
                        res.status(200).json({msg:"Password is Changed.."})
                    })
                }
                else{
                    return res.status(200).json({msg:"Password Doesn't Match.."})
                }
            }
    }
}

module.exports.lostPassword=async(req,res)=>{
    console.log(req.body);
      let employee=await schema.findOne({email:req.body.email});
      if(!employee)
    {
        return res.status(200).json({msg:"User Not Found!"});
    }
     let otp=Math.floor(Math.random()*100000+900000)
        // console.log(otp);    
        mailer.sendOTP(req.body.email,otp);
        let data={
            email:req.body.email,
            otp:otp
        }

     let token=jwt.sign({data},"otp",{expiresIn:"5m"});
    //  console.log(token);
    return res.status(200).json({msg:`OTP send on ${data.email}`,token:token});
        
}

module.exports.verifyPassword=async(req,res)=>{
    console.log(req.body);
    let employee=await schema.findOne({email:req.user.data.email});
    console.log(employee);
    
    if(req.user.data.otp==req.body.otp)
    {
        if(req.body.newPassword==req.body.confirmPassword)
        {
            let hashNewPassword=await bcrypt.hash(req.body.confirmPassword,10);
            await schema.findByIdAndUpdate(employee._id,{password:hashNewPassword})
            .then(()=>{
                res.status(200).json({msg:"Password reset Successfully..."});
            })
        }
        else{
              return res.status(200).json({msg:"Password Doesn't Match.."})
        }
    }
    else{
        return res.status(200).json({msg:"otp is incorrect..."})
    }


}