const express = require("express");
const port = 2007;


const app = express()

const db = require("./config/db")
const schema = require("./model/firstSchema")
const multer = require("./middleware/multer")
const path = require("path")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.get("/",async(req,res)=>{
    await schema.find({}).then((student)=>{
        res.render("index",{student})
    })
})

app.post("/addData", multer ,async(req,res)=>{
//   await schema.create(req.body).then(()=>{
//         res.redirect("/")
//     })

    req.body.image = req.file.path
    await schema.create(req.body).find.then(()=>{
        res.redirect("/")
    })
})

app.get("/deleteData",async(req,res)=>{
    
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        res.redirect("/")
    })
})

app.get("/editData", async(req,res)=>{
    await schema.findById(req.query.id).then((data)=>{
        res.render("edit",{data})
    })
})

app.post("/updateData",async(req,res)=>{
    await schema.findByIdAndUpdate(req.body.id,req.body).then(()=>{
        res.redirect("/")
    })
})

app.listen(port,(err)=>{
    err ? console.log(err) : console.log("server starder on port : " +port);
})