const schema=require("../model/firstSchema");
const fs=require("fs");
const mailer=require("../middelware/mailer");

module.exports.login=(req,res)=>{
    res.render("login");
}

module.exports.loginAdmin=async(req,res)=>{
        res.redirect("/dashboard");
}

module.exports.logout=(req,res)=>{
    req.session.destroy(),
    res.redirect("/");
}

module.exports.dashboard = (req, res) => { 
        res.render("dashboard");
}

module.exports.addAdmin=(req,res)=>{
        res.render("addAdmin");    
}
module.exports.ViewAdmin=async(req,res)=>{
    await schema.find({}).then((data)=>{
    res.render("ViewAdmin",{data});
    })
}
module.exports.adddata=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file.path);
    req.body.image=req.file.path;
    await schema.create(req.body).then(()=>{
        res.redirect("/ViewAdmin");
    })
}

module.exports.deleteData=async(req,res)=>{
    // console.log(req.query.id);
    let singalData=await schema.findById(req.query.id);
    fs.unlinkSync(singalData.image);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/ViewAdmin")
    })
}

module.exports.editData=async(req,res)=>{
    // console.log(req.query.id);
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
}
module.exports.updateData=async(req,res)=>{
    // console.log(req.body);
    // console.log(req.file.path);
    let singalData= await schema.findById(req.body.id);
    let img = " ";
    if(req.file)
    {
        console.log(req.file.path);
        img=req.file.path;
        fs.unlinkSync(singalData.image)
        // fs.unlinkSync(singalData.image);
    }
    else{
        img=singalData.image;
        // console.log(img);
        
    }
    req.body.image=img;
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/ViewAdmin")
    })
}

module.exports.profile=(req,res)=>{
    res.render("profile");
}
module.exports.changePassword=(req,res)=>{
    res.render("changePassword");
}

module.exports.changePasswordData=async(req,res)=>{
     let admin=req.user;
    console.log(admin);

    if(admin.password ==  req.body.oldPassword)
    {
        if(req.body.oldPassword != req.body.newPassword)
        {
            if(req.body.newPassword == req.body.confirmPassword)
            {
                // console.log(newPassword);
                
                await schema.findByIdAndUpdate(admin.id,{password:req.body.newPassword}).then(()=>{
                    res.redirect("/logout");
                })
            }
        }
        else{
            res.redirect("/changePasswordData");
        }
    }
    else{
        res.redirect("/changePasswordData");
    }
}

module.exports.forgot=(req,res)=>{
    res.render("forgot");
}

module.exports.lostPass=async(req,res)=>{
    // console.log(req.body);
    let admin=await schema.findOne({email:req.body.email});

    if(!admin)
    {
        res.redirect("/");
    }

    let otp=Math.floor(Math.random()*100000 +800000)
    // console.log(otp);

    mailer.sendOTP(req.body.email,otp); 
    req.session.adminData=admin;
    req.session.otp=otp;
    res.render("verifyPass");
}

module.exports.verifyPass=async(req,res)=>{
    console.log(req.body);
    let otp=req.session.otp;
    let admin=req.session.adminData;

    if(otp==req.body.otp)
    {
        if(req.body.newPassword == req.body.confirmPassword)
        {   
            await schema.findByIdAndUpdate(admin._id,{password:req.body.newPassword});
            res.redirect("/");
        }
        else{
            req.redirect("/");
        }
    }
    else{
        res.redirect("/");
    }
}   