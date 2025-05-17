const express=require("express");
const route=express.Router();
const passport=require("../middleware/passportSt");
const ctl=require("../controller/subCategoryCtl");

route.get("/addsubCat",passport.checkAuth,ctl.addSubCat);
route.get("/viewsubCategory",passport.checkAuth,ctl.viewSubCat);
route.post("/addsubCatdata",passport.checkAuth,ctl.addsubCategory);

module.exports = route