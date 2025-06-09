const express=require("express");
const port=2005;

const app=express();
const db=require("./config/db");

app.use(express.urlencoded({extended:true}));

app.use("/admin",require("./routes/admin"));
app.use("/manager",require("./routes/manager"));
app.use("/employee",require("./routes/employee"));
app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port:" +port);
})