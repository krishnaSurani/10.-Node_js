const express = require("express");
const port = 2007;

const app = express()
const db = require("./config/db")
const schema = require("./model/schema")

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))
app.get("/addForm",(req,res)=>{
    res.render("form")
});

app.get("/", async(req,res)=>{
   
    await schema.find({}).then((book)=>{
        res.render("index",{book})
    })
})

app.post("/addData",async(req,res)=>{
    console.log(req.body);
    await schema.create(req.body).then(()=>{
        res.redirect("/");
    })  
})

app.get("/deleteData",async(req,res)=>{
    // console.log(req.query.id);
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
})

app.get("/editData",async(req,res)=>{
    // console.log(req.query.id);  
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data});
    })
})

app.post("/updateData",async(req,res)=>{
    // console.log(req.body);
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/");
    })
    
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server started on poer :" +port);
})