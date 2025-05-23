const multer=require("multer");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"image/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now())
    }
})
const image=multer({storage:storage}).single("image");
module.exports=image;