const { findByIdAndUpdate } = require("../models/accountModel")
const accountSchema=require("../models/accountModel")
const userModel = require("../models/userModel")

const createTransaction=async function(req,res){
    let reqData=req.body
    console.log(reqData)
    let created=await accountSchema.create(reqData)
    res.send(created)
}

const getTransaction=async function(req,res){
    try {
        let reqData=req.body
        let created=await accountSchema.find(reqData)
        res.send(created)
        
    } catch (error) {
        res.status(500).send({status:"failed",message:error.message})
    }
}



module.exports={createTransaction,getTransaction}