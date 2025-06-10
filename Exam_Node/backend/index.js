const express=require("express");
const port=2005;

const app=express();
const db=require("./config/db");
const cors=require("cors");

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json())

app.use("/",require("./route/route"));
app.use("/product",require("./route/product"));
app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port "+port);
})