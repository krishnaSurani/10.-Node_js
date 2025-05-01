// const mongoose = require("mongoose")
// mongoose.connect("mongodb://127:0.0.1/SEO_admin-panel")

// const db = mongoose.connection;

// db.once("open",(err)=>{
//     err ? console.log(err) : console.log("Database Connected !");    
// })

// module.exports = db;


const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/SEO_admin-panel");

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database Connected!");
});

db.on("error", (err) => {
  console.error("Connection error:", err);
});

module.exports = db;
