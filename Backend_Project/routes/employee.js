const express=require("express");
const route=express.Router();
const ctl=require("../controller/employeeCtl");
const employeeToken=require("../middleware/EmployeeToken");
const storeOtp =require("../middleware/storeOtp");

route.post("/login",ctl.login);
route.get("/profile",employeeToken,ctl.profile);
route.put("/changePassword",employeeToken,ctl.changePassword);
route.post("/lostPassword",ctl.lostPassword);
route.put("/verifyPassword",storeOtp,ctl.verifyPassword);

module.exports=route