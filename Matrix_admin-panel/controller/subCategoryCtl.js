// let catschema = require("../model/catSchema")

// module.exports.addsubCat = (req, res) => {
//     res.render("addsubCat")
// }

// module.exports.addsubCategory = async (req, res) => {

//     req.body.image = req.file.path

//     await catschema.create(req.body).then(() => {
//         res.redirect("/subcategory/addsubCat")
//     })

// }


// module.exports.viewsubCategory = async (req, res) => {
//     await catschema.find({}).then((data) => {
//         res.render("viewsubCategory", { data })
//     })
// }



module.exports.addSubCat=(req,res)=>{
    res.render("addSubCat");
}

module.exports.vviewsubCategory=(req,res)=>{
    res.render("vviewsubCategory");
}