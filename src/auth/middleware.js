const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = require("../Controller/adminController");

const isValidObjectId = ObjectId=>{
    return mongoose.Types.ObjectId.isValid(ObjectId);
}

const authentication = (req, res, next)=>{
    try{
        let token = req.headers['x-api-key'];
        if(!token){
            return res.status(400).send({status:false, message:"Please provide token..."})
        }

        jwt.verify(token, "banking", (err, decode)=>{
            if(err){
                return res.status(400).send({status:false, error:err.message})
            }else{
                let userId = decode.userId
                req["tokenuserId"] = userId
                next()
            }
        });
    }catch(err){
        return res.status(500).send({status:false, message:"server Error", error:err.message})
    }
}


const authorization = (req, res, next) =>{
    try{
        




    }catch(err){
        return res.status(500).send({status: false, error:err.message});
    }
}


