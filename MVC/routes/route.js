const express =  require("express");
const multer = require("multer")

const route = express.Router()
const ctl = require("../controller/ctl")

route.get("/",ctl.firstpage)
route.get("/form",ctl.form)
route.post("/addData",multer,ctl.add)
route.get("/addData",ctl.add)
route.get("/editData",ctl.edit)
route.get("/updateData",ctl.update)
route.get("/deleteData",ctl.delete)

module.exports = route;