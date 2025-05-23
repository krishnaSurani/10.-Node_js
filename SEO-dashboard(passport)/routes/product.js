const express=require("express");
const route=express.Router();
const passport=require("../middelware/passport");
const ctl=require("../controller/productCtl");
const multer=require("../middelware/multer2");

route.get("/addproduct",passport.check,ctl.addProduct);
route.get("/viewproduct",passport.check,ctl.viewProduct);
route.post("/addProductData",passport.check,multer,ctl.addProductData);

module.exports=route;