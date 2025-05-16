const mongoose=require("mongoose");

const schema=mongoose.Schema({
    catName:{
        type:String,
        require:true
    },

    image:
    {
        type:String,
        require:true
    }
});

const catSchema=mongoose.model("category",schema);

module.exports=catSchema;