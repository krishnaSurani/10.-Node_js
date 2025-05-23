const express=require("express");
const port=2005;

const app=express();
const db=require("./config/db");
const path=require("path")
const passport=require("passport");
const session=require("express-session");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")))
app.use("/image",express.static(path.join(__dirname,"image")));
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use(session({
    name:"local",
    secret:"krishna",
    resave:true,
    saveUninitialized:false,
    cookie:{maxAge:100*100*60}
}))

app.use(passport.session());
app.use(passport.initialize());

app.use("/",require("./routes/route"));
app.use("/category",require("./routes/category"));
app.use("/SubCategory",require("./routes/SubCategory"));
app.use("/product",require("./routes/product"));

app.listen(port,(err)=>{
    err?console.log(err):console.log("server started on the port:"+port);
})