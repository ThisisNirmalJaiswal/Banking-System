const userSchema = require("../models/userModel")

const {st,ust,pass,num,em}=require('../validation/validation')

    
const createUser = async function (req,res){
try{ 
    let data = req.body 

//    let {userName,fatherName,address,aadharCard,panCard,accountBalance } = data

//    if(!(userName)) return res.status(404).send({status:false,message: "shouldProvideUserName"})

//    if(!(fatherName)) return res.status(404).send({status:false,message: "shouldProvideFatherName"})

//    if(!(address)) return res.status(404).send({status:false,message: "shouldProvideFullAddress"})

//    if(!(aadharCard)) return res.status(404).send({status:false,message: "shouldProvideAadharCard"})

//    if(!(panCard)) return res.status(404).send({status:false,message: "shouldProvidePanCard"})

//    if(!(accountBalance)) return res.status(404).send({status:false,message: "shouldProvideMinimumAccountBalance"})


let userData = await userSchema.create(data)

   return res.status(201).send({message:true,data:userData})


}
catch(error){
    res.send({
       status:false,
       message:error.message
    })
}

}

module.exports = {createUser}