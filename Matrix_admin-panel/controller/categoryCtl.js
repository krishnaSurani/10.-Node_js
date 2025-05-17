let schema = require("../model/catSchema")

module.exports.addCat = (req,res)=>{
    res.render("addCat")
}

module.exports.viewCat = async (req,res)=>{
//  res.render("viewCategory");
 await schema.find({}).then((data)=>{
    res.render("viewCategory",{data});
 })
}


module.exports.addCategory = async (req,res)=>{
    
    req.body.image = req.file.path

    await schema.create(req.body).then(()=>{
        res.redirect("/category/viewCat")
    })
    
}

