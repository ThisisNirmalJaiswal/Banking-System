const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const adminModel = require("../Controller/adminController");
const userModel = require("../Controller/userController");

const isValidObjectId = ObjectId=>{
    return mongoose.Types.ObjectId.isValid(ObjectId);
}

const authentication = (req, res, next)=>{
    try{
        let token = req.headers['x-api-key'];
        if(!token) token = req.headers["X-API-KEY"];    
        if(!token){
            return res.status(400).send({status:false, message:"Please provide token..."})
        }
        
        jwt.verify(token, "banking", (err, decode)=>{
            if(err){
                return res.status(400).send({status:false, error:err.message})
            }else{
                let adminId = decode.adminId;
                req["tokenAdminId"] = adminId;
                next()
            }
        });
    }catch(err){
        return res.status(500).send({status:false, message:"server Error", error:err.message})
    }
}


const authorization = (req, res, next) =>{
    try{
        let tokenAdminId = req["tokenAdminId"];
        let adminId = req.params.adminId;
        if(tokenAdminId != adminId){
            return res.status(403).send({status:false, message:"You are not authorised"})
        }
        
        next()
    }catch(err){
        return res.status(500).send({status: false, error:err.message});
    }
}


module.exports = {authentication, authorization};