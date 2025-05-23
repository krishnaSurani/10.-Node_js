const mailer = require('nodemailer')

let trasport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'krishnasurani07@gmail.com',
        pass: 'rvlwzppdliegmcdy'
    }
})

module.exports.sendOTP = (to, Otp) => {
    let mainOpations = {
        to: to,
        form: 'krishnasurani07@gmail.com',
        subject: 'PASSWORD RESET OTP',
        text: `${Otp} Your password reset request most be accept`
    }
    trasport.sendMail(mainOpations)
}