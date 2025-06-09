const express=require("express");
const route=express.Router();
const ctl=require("../controller/managerCtl");
const managerToken=require("../middleware/ManagerToken");
const storeOtp =require("../middleware/storeOtp");


route.post("/login",ctl.login);
route.get("/profile",managerToken,ctl.profile);
route.put("/changePassword",managerToken,ctl.changePassword);
route.post("/lostPassword",ctl.lostPassword);
route.put("/verifyPassword",storeOtp,ctl.verifyPassword);
route.post("/addEmployee",managerToken,ctl.addEmployee);
route.get("/viewAllEmployee",managerToken,ctl.viewAllEmployee);

module.exports=route