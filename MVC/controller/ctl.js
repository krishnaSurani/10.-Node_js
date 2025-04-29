// const schema = require("../model/schema")
const fs = require('fs');



module.exports.firstpage = async(req, res) => {
    await firstSchema.find({}).then((data) => {
    res.render("index", { data });

    })
}

module.exports.form = (req, res) => {
    res.render("form");
}

module.exports.add = async(req, res) => {
    req.body.profile = req.file.path;
    
    await firstSchema.create(req.body).then(() => { 
        res.redirect('/index');
    })    
}


module.exports.delete = async(req, res) => {
    let singleData = await firstSchema.findById(req.query.id);
        fs.unlinkSync(singleData.profile)
    await firstSchema.findByIdAndDelete(req.query.id).then(()=>{
            res.redirect("/index");
        })
}

module.exports.edit = async(req,res)=>{
    let data = await firstSchema.findById(req.query.id);
    res.render("edit",{data})
}


module.exports.update = async(req,res)=>{
     let singleData = await firstSchema.findById(req.body.id);
     let img = ""
    
        req.file ? img = req.file.path : img = singleData.profile;
        req.file && fs.unlinkSync(singleData.profile)
    
    req.body.profile = img;
    await firstSchema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/index")
    })
}