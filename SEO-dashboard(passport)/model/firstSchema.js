const mongoose=require("mongoose");
const schema = mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const firstSchema=mongoose.model("AdminDetail",schema);

module.exports=firstSchema