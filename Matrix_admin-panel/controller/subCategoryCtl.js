const catSchema = require("../model/catSchema");
let catschema = require("../model/catSchema")
let subCatschema = require("../model/subCatschema")

module.exports.addSubCat=async (req,res)=>{
    await catSchema.find({}).then((data)=>{
        res.render("addsubCategory",{data});
    })
    
}
module.exports.viewSubCat=async(req,res)=>{
    // res.render("viewsubCategory");
    await subCatschema.find({}).then((data)=>{
        res.render("viewsubCategory",{data});
    })
}

module.exports.addsubCategory = async (req, res) => {
    // req.body.image = req.file.path
    // console.log(req.body);
    
    await subCatschema.create(req.body).then(() => {
        res.redirect("/subcategory/viewsubCategory")
    })

}


