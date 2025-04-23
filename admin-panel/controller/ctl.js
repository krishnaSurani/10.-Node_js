const schema = require("../model/firstSchema")

module.exports.dashboard = (req,res)=>{
    res.render("dashboard")
}

module.exports.addAdmin = (req,res)=>{
    res.render("addAdmin")
}



module.exports.viewAdmin = (req,res)=>{
    res.render("viewAdmin")
}