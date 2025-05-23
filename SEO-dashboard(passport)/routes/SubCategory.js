const express=require("express")
const route=express.Router();
const passport=require("../middelware/passport");
const ctl=require("../controller/subCatCtl");

route.get("/addSubCat",passport.check,ctl.addSubCat);
route.get("/viewSubCat",passport.check,ctl.viewSubCat);
route.post("/addSubCatData",passport.check,ctl.addSubCatData);
module.exports=route;