const express = require("express")
const path = require("path")
const port = 2007;

const app= express();

app.set("view engine","ejs")
app.get("/",(req,res)=>{
    res.render("index")
})

app.use(express.static(path.join(__dirname,"public")))

app.listen(port,(err)=>{
  err ? console.log(err) : console.log("server started on port :" + port);   
})