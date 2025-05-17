const mongoose=require("mongoose");

const schema=mongoose.Schema({
    subcatName:{
        type:String,
        require:true
    },

    categoryId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref :"category",
        require:true
    }
});

const subcatSchema=mongoose.model("subcategory",schema);

module.exports=subcatSchema;