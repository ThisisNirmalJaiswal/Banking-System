const adminSchema=require('../models/adminModel')
const userSchema=require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {st,ust,pass,num,em}=require('../validation/validation')

const createAdmin= async function(req,res){
try{
    let data=req.body
    const {name,username,password,phone,email}=data

    if(!name) return res.status(404).send({status: false, message:'name is required'})
    if(!username) return res.status(404).send({status: false, message:'username is required'})
    if(!password) return res.status(404).send({status: false, message:'password is required'})
    
    if(!phone) return res.status(404).send({status: false, message:'phone is required'})
    if(!email) return res.status(404).send({status: false, message:'email is required'})

    if(!st(name)) return res.status(400).send({status: false, message:'name is not string or length less than 7 characters'})
    if(!ust(username)) return res.status(400).send({status: false, message:'username is not in right format'})

    
    if(await adminSchema.findOne({username})) return res.status(400).send({status: false, message:'username should be unique'})

    if(!pass(password)) return res.status(400).send({status: false, message:'password is not in right format'})

    if(!num(phone)) return res.status(400).send({status: false, message:'phone is not in right format'})

   
    if(await adminSchema.findOne({phone})) return res.status(400).send({status: false, message:'phone should be unique'})

    if(!em(email)) return res.status(400).send({status: false, message:'email is not in right format'})

    if(await adminSchema.findOne({email})) return res.status(400).send({status: false, message:'email should be unique'})

    const hashed = await bcrypt.hash(password, 10);
    console.log(hashed);
    data.password = hashed;
    let adminData = await adminSchema.create(data)

  
    res.status(201).send({status:true, message:adminData})
}
catch(error){
         res.send({
            status:false,
            message:error.message
         })
}
}


const login = async (req, res)=>{
    try{
        let data = req.body;
        const {username, password} = req.body;
        const validUser = await adminSchema.findOne({username});
        if(!validUser){
            return res.status(404).send({status: false, message: "username invalid"})
        }
        let validPassword = await bcrypt.compare(password, validUser.password)

        if(!validPassword)return res.status(400).send({status:false, message: "password or username is invalid"});
        let expiresIn = { expiresIn: "60s" };
    let token = jwt.sign(
        {
            data: validUser._id.toString(),
            iat: Math.floor(Date.now() / 1000)
        },
        "banking",
        expiresIn
    );


        return res.status(200).send({status: true, message:"Logged in successful!", data:{data:validUser._id, token: token}});

    }catch(err){
        return res.status(500).send({status: false, error: err.message})
    }
}




const getUser = async (req, res) => {
    let param = req.query;
    if (Object.keys(param).length == 0) {
        return res.status(404).send({ status: false, message: "Priy grahak apni jankari de nhi to maa chudaye" })
    }
    let user = await userSchema.find(param);
    if (!user) {
        return res.status(404).send({ status: false, message: "please sure that you fill ur details correctly or no data" })
    }
    return res.status(200).send({ status: true, data: user });
}



const getAllUsers = async (req, res) => {
    try {
        let data = req.query;

        let users = await userSchema.find();
        return res.status(200).send({ status: true, data: users });
    } catch (err) {
        return res.status(500).send({ status: false, Error: err.message });
    }
}

const getStatus=async (req,res)=>{
    try{
          let getData=await userSchema.find({accountStatus:"Pending"})
          if(getData.length==0) return res.status(404).send({status:"failed",messagea:"user not found"})
          res.status(200).send({status:"success",data:getData})
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}
const changeStatus=async function(req,res){
    try {
        let userId=req.body.userId
        let updateStatus=await userSchema.findByIdAndUpdate(userId,{accountStatus:req.body.status},{new:true})
        res.status(200).send({status:"success",data:updateStatus})
    } catch (err) {
        res.status(500).send({status:"failed",message:err.message})
    }
}

module.exports={createAdmin, login,getUser,getAllUsers,getStatus,changeStatus}
