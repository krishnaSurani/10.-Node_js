const schema=require("../model/schema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const mailer=require("../middleware/mailer");

module.exports.login=async(req,res)=>{
    console.log(req.body);
    let manager=await schema.findOne({email:req.body.email,role: "manager"});
    if(!manager)
    {
        return res.status(200).json({msg:"User Not Found !"});
    }
    if(await bcrypt.compare(req.body.password,manager.password))
    {
        const token=jwt.sign({manager},"manager",{expiresIn:"5h"});
        // console.log(token);
        return res.status(200).json({msg:"User Logged in successfully..",token:token});
    }
    else{
        return res.status(200).json({msg:"Password is wrong !"})
    }
}

module.exports.profile=async(req,res)=>{
    // console.log(req.user);
    const manager=await schema.findById(req.user.manager._id);
    // console.log(manager);
    if(!manager)
    {
        return res.status(200).json({msg:"Not a manager"});
    }
    if(manager.role != "manager")
    {
        return res.status(200).json({msg:"Access Denied"});
    }
    res.status(200).json({msg:"Profile data shown",
          id:manager._id,
        username:manager.username,
        email:manager.email,
        phone:manager.phone,
        role:manager.role,
        adminId:manager.adminId
    })
}

module.exports.changePassword=async(req,res)=>{
        console.log(req.body);
        let manager=req.user.manager
        console.log(manager);
        
         if(await bcrypt.compare(req.body.oldPassword,manager.password))
         {
            if(req.body.oldPassword != req.body.newPassword)
            {
                 if(req.body.newPassword == req.body.confirmPassword)
                    {
                    hashNewPassword=await bcrypt.hash(req.body.confirmPassword,10)
                    // console.log(req.body.confirmPassword);
                    await schema.findByIdAndUpdate(manager._id,{password:hashNewPassword})
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
    let manager=await schema.findOne({email:req.body.email});
      if(!manager)
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
    console.log(token);
    return res.status(200).json({msg:`OTP send on ${data.email}`,token:token});
}

module.exports.verifyPassword=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.user);
    let manager=await schema.findOne({email:req.user.data.email});
    // console.log(manager);
    if(req.user.data.otp==req.body.otp)
    {
        if(req.body.newPassword==req.body.confirmPassword)
        {
            let hashNewPassword=await bcrypt.hash(req.body.confirmPassword,10);
            await schema.findByIdAndUpdate(manager._id,{password:hashNewPassword})
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


module.exports.addEmployee=async(req,res)=>{
    // console.log(req.body);
    let existEmployee=await schema.findOne({email:req.body.email});

    if(existEmployee)
    {
        return res.status(200).json({msg:"Employee already existed.."});
    }

    hashPass=await bcrypt.hash(req.body.password,10);

    console.log(req.user.manager);
    
    let Employee={
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:hashPass,
        role:"employee",
        managerId:req.user.manager._id
    }
    console.log(Employee);
    
    await schema.create(Employee).then((data)=>{
        res.status(200).json({msg:"Employee Created !",employee:data});
    })

    await mailer.sendEmailtoEmployee(Employee.email,req.body.password)

}

module.exports.viewAllEmployee=async(req,res)=>{
    const employee=await schema.find({role:"employee"});

    res.status(200).json({
        count:employee.length,
        employee:employee
    })
}