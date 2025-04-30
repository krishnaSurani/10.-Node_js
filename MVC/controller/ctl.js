const firstSchema = require("../model/schema");
const fs = require('fs');

module.exports.firstpage = async (req, res) => {
    await firstSchema.find({}).then((book) => {
        res.render("index", { book });
    });
};

module.exports.form = (req, res) => {
    res.render("form");
};

module.exports.add = async (req, res) => {
    req.body.img = req.file.path;
    // console.log(req.body);
    await firstSchema.create(req.body).then(() => {
        res.redirect('/');
    });
};


module.exports.delete = async (req, res) => {
    let singleData = await firstSchema.findById(req.query.id);
    fs.unlinkSync(singleData.img);
    await firstSchema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/");
    });
};

module.exports.edit = async (req, res) => {
    let data = await firstSchema.findById(req.query.id);
    res.render("edit", { book });
};

module.exports.update = async (req, res) => {
    let singleData = await firstSchema.findById(req.body.id);
    let img = "";

    if (req.file) {
        img = req.file.path;
        fs.unlinkSync(singleData.img);
    } else {
        img = singleData.img;
    }

    req.body.img = img;

    await firstSchema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/");
    });
};
