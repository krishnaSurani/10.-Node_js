const express=require("express");
const route=express.Router();
const ctl=require("../controller/adminCtl");
const verifyToken=require("../middleware/verifyToken");
const storeOtp =require("../middleware/storeOtp");

route.post("/register",ctl.register);
route.post("/login",ctl.login);
route.get("/profile",verifyToken,ctl.profile);
route.put("/changePassword",verifyToken,ctl.changePassword);
route.post("/lostPassword",ctl.lostPassword);
route.put("/verifyPassword",storeOtp,ctl.verifyPassword);
route.post("/addManager",verifyToken,ctl.addManager);
route.get("/allManagers",verifyToken,ctl.allManagers);
route.put("/managerDelete/:id",verifyToken,ctl.managerDelete);
route.get("/viewAllEmployee",verifyToken,ctl.viewAllEmployee);
route.put("/employeeDelete/:id",verifyToken,ctl.employeeDelete);

module.exports=route