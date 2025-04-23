const express = require("express")
const port = 2007;
const path = require("path")

const app = express();
const db = require("./config/db")

app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname,"public")))

app.use("/",require("./routes/route"))

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on port :" +port);
})