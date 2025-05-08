const fSchema = require('../model/fschema');
const fs = require('fs');


module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.loginadmin = async (req, res) => {
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
    res.render("addAdmin")
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
        res.redirect('/viewAdmin');
    })
}


module.exports.delete = async (req, res) => {
    let singleData = await fSchema.findById(req.query.id);
    fs.unlinkSync(singleData.profile)
    await fSchema.findByIdAndDelete(req.query.id).then(() => {
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
