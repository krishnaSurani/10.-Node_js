const mongoose=require("mongoose");
const schema=mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    cat:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
})
const fschema=mongoose.model("product",schema);
module.exports=fschema;