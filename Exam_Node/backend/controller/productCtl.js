const schema=require("../model/productSchema")

module.exports.addProduct=async(req,res)=>{
    // console.log(req.body);
    await schema.create(req.body).then(()=>{
        return res.status(200).json({msg:"data added successfully"});
    })
}

module.exports.viewproduct=async(req,res)=>{
    await schema.find({}).then((data)=>{
        return res.status(200).json({msg:"data show",data:data});
    })
}

module.exports.deleteproduct=async(req,res)=>{
    // console.log(req.query.id) 
    await schema.findByIdAndDelete(req.query.id).then(()=>{
        return res.status(200).json({msg:"data deleted"})
    })
}

module.exports.updateproduct=async(req,res)=>{
    // console.log(req.body);
    await schema.findByIdAndUpdate(req.query.id,req.body).then(()=>{
        return res.status(200).json({msg:"data updated.."})
    })
    
}