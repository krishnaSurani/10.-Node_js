const schema=require("../model/catSchema");

module.exports.addCat=(req,res)=>{
    res.render("addCat");
}
module.exports.viewCat=async(req,res)=>{
    await schema.find({}).then((data)=>{
        res.render("viewCat",{data})
    })
}   

module.exports.addCatData=async(req,res)=>{
    req.body.image=req.file.path;
    console.log(req.body);   
    await schema.create(req.body).then(()=>{
        res.redirect("/category/viewCat")
    })
}