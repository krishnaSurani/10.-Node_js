const nodemailer=require("nodemailer");
const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"krishnasurani07@gmail.com",
        pass:"pnsvbyvxovywcaai"
    }
})

module.exports.sendOTP=(to,otp)=>{
    let mailOptions={
        to:to,
        from:"krishnasurani07@gmail.com",
        subject:"Password Reset OTP",
        text:`Your Password reset OTP is: ${otp}`
    }

    transport.sendMail(mailOptions);
};

module.exports.sendEmail=(to,password)=>{
   let mailOptions={
     to:to,
     from:"krishnasurani07@gmail.com",
     subject:"logging Details",
     text:`your email is :${to},
    your password is :${password}
    Login at: http://localhost:2005/manager/login
    `
   }
   transport.sendMail(mailOptions);
};

module.exports.sendEmailtoEmployee=(to,password)=>{
   let mailOptions={
     to:to,
     from:"kp497485@gmail.com",
     subject:"logging Details",
     text:`your email is :${to},
    your password is :${password}
    Login at: http://localhost:2005/employee/login
    `
   }
   transport.sendMail(mailOptions);
}