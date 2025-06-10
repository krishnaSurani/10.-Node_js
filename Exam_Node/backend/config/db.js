const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1/MernStack_Login_Register");
const db=mongoose.connection;

db.once("open",(err)=>{
    err?console.log(err):console.log("Database connected..");  
})

module.exports=db

// mongoose.connect("mongodb+srv://krishna12:krishna12@cluster0.z2uzzaq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
// .then(()=>{
//     console.log("db connected !");
// })

// module.exports=mongoose;