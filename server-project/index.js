const http = require("http")
const port = 2007;


const portHandler = (req,res)=>{
    res.write("<h1>Server tarted on port 2007</h1>");
    res.end();
}

const server = http.createServer(portHandler)


server.listen(port,(err)=>{

    err ? console.log(err) : console.log("server started on port : " + port);
    
    
})