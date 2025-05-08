const express = require('express');
const multer = require('../middleware/multer');

const route = express.Router();
const ctl = require('../controller/ctl');
const passportSt = require("../middleware/passportSt")

route.get("/",ctl.login)
route.post("/login",passportSt.checkAuth,ctl.loginadmin);
route.get("/logout",passportSt.checkAuth,ctl.logout);
route.get('/dashboard',passportSt.checkAuth,ctl.dashboard);
route.get('/addAdmin',passportSt.checkAuth, ctl.addAdmin);
route.get('/viewAdmin', passportSt.checkAuth,ctl.viewAdmin);
route.post('/addrecord',multer,passportSt.checkAuth, ctl.add);
route.get("/deldata",passportSt.checkAuth,ctl.delete);
route.get("/editdata",passportSt.checkAuth,ctl.edit);
route.post("/updaterec",multer,passportSt.checkAuth,ctl.update);

module.exports = route;