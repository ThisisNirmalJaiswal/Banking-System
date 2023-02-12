const adminSchema=require('../models/adminModel')
const bcrypt = require("bcrypt");
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
    let adminData = await adminSchema.create(data).select({_id:0})

  
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
        const {username, password} = data;
        const validUser = await adminSchema.findOne({username});
        if(!validUser){
            return res.status(404).send({status: false, message: "username invalid"})
        }
        let validPassword = await bcrypt.compare(password, validUser.password)

        if(!validPassword){
            return res.status(400).send({status:false, message: "password or username is invalid"});
        }else{
            return res.status(200).send({status: true, message: "Logged in succesfully"});
        }

    }catch(err){
        return res.status(500).send({status: false, message: err})
    }
}

module.exports={createAdmin, login}