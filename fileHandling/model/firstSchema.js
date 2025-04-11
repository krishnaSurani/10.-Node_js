const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    Subject : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    image : {
       type : String,
    required : true
    }
})

const firstSchema = mongoose.model("student",schema)

module.exports = firstSchema;