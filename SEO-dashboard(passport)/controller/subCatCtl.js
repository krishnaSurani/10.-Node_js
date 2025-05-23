const catSchema=require("../model/catSchema");
const schema=require("../model/subCatSchema");

module.exports.addSubCat=async(req,res)=>{
    // res.render("addSubCat");
    await catSchema.find({}).then((data)=>{
        res.render("addSubCat",{data});
    })
}

module.exports.viewSubCat=async(req,res)=>{
    // res.render("viewSubCat");
    await schema.find({}).populate("categoryId").then((data)=>{
    //   console.log(data);
        res.render("viewSubCat",{data});
    })
}

module.exports.addSubCatData=async(req,res)=>{
    // console.log(req.body);
    await schema.create(req.body).then(()=>{
        res.redirect("/SubCategory/viewSubCat");
    })
}