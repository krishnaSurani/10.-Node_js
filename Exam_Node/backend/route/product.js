const express=require("express");
const route=express.Router();
const ctl=require("../controller/productCtl");

    route.post("/addProduct",ctl.addProduct);
    route.get("/viewproduct",ctl.viewproduct);
    route.delete("/deleteproduct",ctl.deleteproduct);
    route.put("/updateproduct",ctl.updateproduct);

module.exports=route;