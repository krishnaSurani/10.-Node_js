const mongoose = require("mongoose");

const schema = mongoose.Schema({
    profile:{
        type : String,
        required : true,    
    },
    fname : {
        type : String,
        required : true
    },
    lname : {
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

const fSchema = mongoose.model("admin",schema);
module.exports = fSchema;