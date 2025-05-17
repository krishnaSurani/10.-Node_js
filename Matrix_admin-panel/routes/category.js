const express=require("express");
const route=express.Router();
const passport=require("../middleware/passportSt");
const ctl=require("../controller/categoryCtl");
const multer=require("../middleware/multer2");

route.get("/addCat",passport.checkAuth,ctl.addCat);
route.get("/viewCat",passport.checkAuth,ctl.viewCat);
route.post("/addCategory",passport.checkAuth,multer,ctl.addCategory);

module.exports=route;