const nodemailer = require("nodemailer")

const trasport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "krishnasurani07@gmail.com",
        pass : "pnsvbyvxovywcaai"
    }
})

module.exports.sendOTP = (to,otp)=>{
    let mailOptions = {
        to : to,
        from : "krishnasurani07@gmail.com",
        subject : "PASSWORD RESET OTP",
        text : `you password reset otp is  ${otp} `
    }

    trasport.sendMail(mailOptions)
}