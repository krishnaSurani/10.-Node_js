const mongoose = require("mongoose");

const schema = mongoose.Schema({
    profile:{
        type : String,
        required : true,    
    },
    name : {
        type : String,
        required : true
    },  
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
});

const fSchema = mongoose.model("users",schema);
module.exports = fSchema;