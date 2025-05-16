const fSchema = require('../model/fschema');
const fs = require('fs');
const mailer = require("../middleware/mailer")


module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.loginadmin = async (req, res) => {
    req.flash("success", "Loging Successfully")
    res.redirect("/dashboard")
}

module.exports.logout = (req, res) => {
    req.session.destroy(),
        res.redirect("/")
}

module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}
module.exports.addAdmin = (req, res) => {
    res.render("addAdmin");
}

module.exports.viewAdmin = async (req, res) => {
    await fSchema.find({}).then((data) => {
        res.render("viewAdmin", { data });
    })

}

module.exports.add = async (req, res) => {
    req.body.profile = req.file.path;

    await fSchema.create(req.body).then(() => {
        req.flash("success", "Admin Added Successfully")
        res.redirect('/viewAdmin');
    })
}


module.exports.delete = async (req, res) => {
    let singleData = await fSchema.findById(req.query.id);
    fs.unlinkSync(singleData.profile)
    await fSchema.findByIdAndDelete(req.query.id).then(() => {
        req.flash("success", "Admin Deleted Successfully")
        res.redirect("/viewAdmin");
    })
}

module.exports.edit = async (req, res) => {
    let data = await fSchema.findById(req.query.id);
    res.render("edit", { data })
}


module.exports.update = async (req, res) => {
    let singleData = await fSchema.findById(req.body.id);
    let img = ""

    req.file ? img = req.file.path : img = singleData.profile;
    req.file && fs.unlinkSync(singleData.profile)

    req.body.profile = img;
    await fSchema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/viewAdmin")
    })
}


module.exports.profile = (req, res) => {
    res.render("profile")
}

module.exports.changepassword = (req, res) => {
    res.render("changePassword");
}

module.exports.changePasswordData = async (req, res) => {
    // console.log(req.body);
    let admin = req.user;
    console.log(admin);

    if (admin.password == req.body.oldPassword) {
        if (req.body.oldPassword != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {
                // console.log(newPassword);

                await schema.findByIdAndUpdate(admin.id, { password: req.body.newPassword }).then(() => {
                    res.redirect("/logout");
                })
            }
        }
        else {
            res.redirect("/changePasswordData");
        }
    }
    else {
        res.redirect("/changePasswordData");
    }
}


module.exports.lostpass = async (req, res) => {
    let admin = await fSchema.findOne({ email: req.body.email });
    if (!admin) {
        return res.redirect("/")
    }

    let otp = Math.floor(Math.random() * 100000 + 900000)


    console.log(otp);
        
    mailer.sendOTP(req.body.email, otp);
    req.session.otp = otp;
    req.session.adminData = admin;
    res.render("verifypass")
}

module.exports.verifypass = async (req, res) => {
    let otp = req.session.otp
    let admin = req.session.adminData

    if (otp == req.body.otp) {
        if (req.body.oldPassword != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {

                await fSchema.findByIdAndUpdate(admin._id, { password: req.body.newPassword }).then(() => {
                    res.redirect("/");
                })
            }
        }
        else {
            res.redirect("/");
        }
    }
    else {
        res.redirect("/")
    }
}