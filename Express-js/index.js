const express = require("express");
const port = 2007;

const app = express();

app.set("view engine", "ejs");

let student = [
    {id: 1, name : "krishna", subject : "node"}
]

app.get("/",(req,res)=>{
    res.render("index",{student})
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on port :" + port);
})