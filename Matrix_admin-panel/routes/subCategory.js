const express = require("express")
const route = express.Router();
const ctl = require("../controller/subCategoryCtl")
const passport = require("../middleware/passportSt")

route.get("/addsubCat", passport.checkAuth, ctl.addsubCat)
route.post("/addsubCategory", passport.checkAuth, ctl.addsubCategory)
route.get("/viewsubCat", passport.checkAuth, ctl.viewsubCategory)

module.exports = route
