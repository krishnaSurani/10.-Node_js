// const express =  require("express");
// const multer = require("multer")

// const route = express.Router()
// const ctl = require("../controller/ctl")

// route.get("/",ctl.firstpage)
// route.get("/form",ctl.form)
// route.post("/addData",multer,ctl.add)
// route.get("/addData",ctl.add)
// route.get("/editData",ctl.edit)
// route.get("/updateData",ctl.update)
// route.get("/deleteData",ctl.delete)

// module.exports = route;



const express = require("express");
const multer = require("multer");

const route = express.Router();
const ctl = require("../controller/ctl");

const upload = multer({ dest: "uploads/" });

route.get("/", ctl.firstpage);
route.get("/form", ctl.form);
route.post("/addData", upload.single("profile"), ctl.add);
route.get("/editData", ctl.edit);
route.post("/updateData", upload.single("profile"), ctl.update); // update should be POST, not GET
route.get("/deleteData", ctl.delete);

module.exports = route;
