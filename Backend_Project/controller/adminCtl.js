const schema=require("../model/schema");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const mailer=require("../middleware/mailer");

module.exports.register=async(req,res)=>{
    // console.log(req.body);
    let admin=await schema.findOne({email: req.body.email});

    if(admin)
    {
        return res.status(200).json({msg:"User Already Existed"});
    }

    req.body.password=await bcrypt.hash(req.body.password,10);

    await schema.create(req.body).then((data)=>{
        res.status(200).json({msg:"User registered successfully....",admin:data});
    })
}

module.exports.login=async(req,res)=>{
    console.log(req.body);
    let admin=await schema.findOne({email:req.body.email});

    if(!admin)
    {
        return res.status(200).json({msg:"User Not Found !"});
    }
    if(await bcrypt.compare(req.body.password,admin.password))
    {
        const token=jwt.sign({admin},"kp",{expiresIn:"5h"});
        // console.log(token);
        
        return res.status(200).json({msg:"User Logged in successfully..",token:token});
    }
    else{
        return res.status(200).json({msg:"Password is wrong !"})
    }
}
module.exports.profile=async(req,res)=>{
    // console.log(req.user._id)
    const admin=await schema.findById(req.user.admin._id);
    // console.log(admin);
    
    if(!admin)
    {
        return res.status(200).json({msg:"Not a Admin"});
    }
    if(admin.role != 'admin')
    {
        return res.status(200).json({msg:"Access Denied"});
    }

    res.status(200).json({msg:"Profile data Showen",
        id:admin._id,
        username:admin.username,
        email:admin.email,
        phone:admin.phone,
        role:admin.role
    })
}

module.exports.changePassword=async(req,res)=>{
    // console.log(req.body);
    let admin=req.user.admin;
    console.log(admin);
    if(await bcrypt.compare(req.body.oldPassword,admin.password))
    {
        if(req.body.oldPassword != req.body.newPassword)
        {
            if(req.body.newPassword == req.body.confirmPassword)
            {
                hashNewPassword=await bcrypt.hash(req.body.confirmPassword,10)
                // console.log(req.body.confirmPassword);
                await schema.findByIdAndUpdate(admin._id,{password:hashNewPassword})
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
    // console.log(req.body);
    let admin=await schema.findOne({email:req.body.email});
      if(!admin)
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
    // console.log(token);
    return res.status(200).json({msg:`OTP send on ${data.email}`,token:token});
}

module.exports.verifyPassword=async(req,res)=>{
    // console.log(req.body);
    console.log(req.user);
    let admin=await schema.findOne({email:req.user.data.email});
    console.log(admin);
    if(req.user.data.otp==req.body.otp)
    {
        if(req.body.newPassword==req.body.confirmPassword)
        {
            let hashNewPassword=await bcrypt.hash(req.body.confirmPassword,10);
            await schema.findByIdAndUpdate(admin._id,{password:hashNewPassword})
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

module.exports.addManager=async(req,res)=>{
    console.log(req.body);
    let Existedmanager=await schema.findOne({email: req.body.email});

    if(Existedmanager)
    {
        return res.status(200).json({msg:"Manager already exists.."});
    }

    hashPass=await bcrypt.hash(req.body.password,10);

    let manager={
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:hashPass,
        role:"manager",
        adminId:req.user.admin._id
    }

    console.log(manager);
    
    await schema.create(manager).then((data)=>{
        res.status(200).json({msg:"manager created successfully....",manager:data});
    })

    await mailer.sendEmail(manager.email,req.body.password);
}

module.exports.allManagers=async(req,res)=>{
    const managers=await schema.find({role:"manager"});

    res.status(200).json({
        count:managers.length,
        managers:managers
    })
}

module.exports.managerDelete=async(req,res)=>{
    const id=req.params.id;
    const status=req.query.status==="true";

    const updateManager=await schema.findByIdAndUpdate(id,{isActive:status},{new:true})

    if(!updateManager || updateManager.role != "manager" )
    {
        return res.status(200).json({ msg: "Manager not found" });
    }
    res.status(200).json({
    msg: `Manager ${status ? "activated" : "deactivated"} successfully`,
    manager: updateManager
  });

};

module.exports.viewAllEmployee=async(req,res)=>{
    const employee=await schema.find({role:"employee"});

    res.status(200).json({
        count:employee.length,
        employee:employee
    })
}

module.exports.employeeDelete=async(req,res)=>{
    const id=req.params.id;
    const status=req.query.status==="true";

    const updateEmployee=await schema.findByIdAndUpdate(id,{isActive:status},{new:true})

    if(!updateEmployee || updateEmployee.role != "employee" )
    {
        return res.status(200).json({ msg: " employee not found" });
    }
    res.status(200).json({
    msg: `employee ${status ? "activated" : "deactivated"} successfully`,
    employee: updateEmployee
  });

};