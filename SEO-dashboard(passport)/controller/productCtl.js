const subCatSchema=require("../model/subCatSchema");
const schema=require("../model/productSchema");
module.exports.addProduct=async(req,res)=>{
    await subCatSchema.find({}).then((data)=>{
        res.render("addProduct",{data});
        // console.log(data);
    })
}

module.exports.viewProduct=async(req,res)=>{
    await schema.find({}).populate({
        path:"subCategoryId",
        populate:{
            path:"categoryId",
        }
    }).then((Data)=>{
    res.render("viewProduct",{Data});
    // console.log(Data);
    })
}
module.exports.addProductData=async(req,res)=>{
        // console.log(req.body);   
        req.body.image=req.file.path;
        await schema.create(req.body).then(()=>{
            res.redirect("/product/viewProduct")
        })
}