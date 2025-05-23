const express=require("express");
const passport=require("../middelware/passport");
const multer=require("../middelware/multer");
const route=express.Router();
const ctl=require("../controller/ctl");

route.get("/",ctl.login);
route.post("/loginAdmin",passport.authenticate("local",{failureRedirect:"/"}),ctl.loginAdmin);
route.get("/logout",ctl.logout);
route.get("/dashboard",passport.check,ctl.dashboard);
route.get("/addAdmin",passport.check,ctl.addAdmin);
route.get("/viewAdmin",passport.check,ctl.ViewAdmin);
route.post("/adddata",passport.check,multer,ctl.adddata);
route.get("/deleteData",passport.check,ctl.deleteData);
route.get("/editData",passport.check,ctl.editData);
route.post("/updateData",passport.check,multer,ctl.updateData);
route.get("/profile",passport.check,ctl.profile);
route.get("/changePassword",passport.check,ctl.changePassword);
route.post("/changePasswordData",passport.check,ctl.changePasswordData);
route.get("/forgot",ctl.forgot);
route.post("/lostPass",ctl.lostPass);
route.post("/verifyPass",ctl.verifyPass);

module.exports=route;