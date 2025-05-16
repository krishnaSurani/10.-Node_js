const express = require('express');
const multer = require('../middleware/multer');

const route = express.Router(); 
const ctl = require('../controller/ctl');
const passportSt = require("../middleware/passportSt")

route.get("/",ctl.login)
route.post("/login",passportSt.authenticate("local",{failureRedirect : "/"}),ctl.loginadmin);
route.get("/logout",ctl.logout);
route.get('/dashboard', passportSt.checkAuth,ctl.dashboard);
route.get('/addAdmin',passportSt.checkAuth, ctl.addAdmin);
route.get('/viewAdmin', passportSt.checkAuth,ctl.viewAdmin);
route.post('/addrecord',multer,passportSt.checkAuth, ctl.add);
route.get("/deldata",passportSt.checkAuth,ctl.delete);
route.get("/editdata",passportSt.checkAuth,ctl.edit);
route.post("/updaterec",multer,passportSt.checkAuth,ctl.update);
route.get("/profile",passportSt.checkAuth,ctl.profile)
route.get("/changePassword",passportSt.checkAuth,ctl.changepassword)
route.post("/changePasswordData",passportSt.checkAuth,ctl.changePasswordData);
route.post("/lostpass",ctl.lostpass)
route.post("/verifypass",ctl.verifypass)


module.exports = route;