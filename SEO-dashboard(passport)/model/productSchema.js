const mongoose=require("mongoose");
 const schema=mongoose.Schema({
    productName:{
        type:String,
        require:true
    },
    productPrice:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    subCategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"sub-category",
        require:true
    },
})

const productSchema=mongoose.model("Product",schema);

module.exports=productSchema;