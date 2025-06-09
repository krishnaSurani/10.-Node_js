const mongoose=require("mongoose");
const schema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
       email:{
        type:String,
        required:true
    },
       phone:{
        type:String,
        required:true
    },
       password:{
        type:String,
        required:true
    },
       role:{
        type:String,
        enum:['admin','manager','employee'],
        required:true
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,  //create
        ref:"users", //referance
    },
    managerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    isActive:{
        type:Boolean,
        default:true
    }

})
const allSchema=mongoose.model("users",schema);

module.exports=allSchema;