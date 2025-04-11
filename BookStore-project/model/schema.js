const mongoose=require("mongoose");

const schema=mongoose.Schema({
    img:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }
});

const firstSchema=mongoose.model("Book_Detail",schema);

module.exports=firstSchema;