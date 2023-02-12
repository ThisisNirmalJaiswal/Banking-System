const adminSchema=require('../models/adminModel')
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


    let adminData=await adminSchema.create(data)

  
    res.status(201).send({status:true, message:adminData})
}
catch(error){
         res.send({
            status:false,
            message:error.message
         })
}
}

module.exports={createAdmin}