const mongoose=require("mongoose");
const schema=mongoose.Schema({
    subCatName:{
        type:String,
        require:true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        require:true
    }
})

const subcatSchema=mongoose.model("sub-category",schema);
module.exports=subcatSchema;