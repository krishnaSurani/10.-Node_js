const express=require("express");
const route=express.Router();
const ctl=require("../controller/categoryCtl");
const passport=require("../middelware/passport");
const multer=require("../middelware/multer2");

route.get("/addCat",passport.check,ctl.addCat);
route.get("/viewCat",passport.check,ctl.viewCat);
route.post("/addCatData",passport.check,multer,ctl.addCatData);


module.exports=route;