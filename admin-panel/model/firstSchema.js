const mongoose = require("mongoose")

const schema = mongoose.Schema({
    fname:{
        type : String,
        required : true
    },
    lname:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : Number,
        required : true
    }
})


const firstSchema = mongoose.model("student",schema);

module.exports = firstSchema