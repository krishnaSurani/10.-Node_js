const express = require("express")
const route = express.Router();
const passport = require("../middleware/passportSt")
const ctl = require("../controller/categoryCtl")
const multer2 = require("../middleware/multer2")

route.get("/addCat",passport.checkAuth,ctl.addCat)
route.post("/addCat",passport.checkAuth,multer2,ctl.addCategory)
route.post("/viewCat",passport.checkAuth,ctl.viewCategory)

module.exports = route




