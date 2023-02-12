const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    userName : {type: String ,required: [true,"please put userName"] },

    fatherName : {type: String ,required: [true,"please put Father Name"]},

    aadharCard : {type: String ,required: [true,"aadhar card mandatory"], unique: true},

   panCard : {type: String ,required: [true,"pan card mandatory"], unique:true},

   // officialPhoto :{},

  address: {
       
          street: { type: String, required: true },
          city: { type: String, required: true },
          pincode: { type: Number, required: true }},

    accountType: {type: String, required: [true,"please put accountType here"],enum:["savingAccount", "currentAccount"]},

    accountBalance: {type : Number , required: [true,"accountBalanceMinimum - 1000 for saving account and 10000 for currentAccount "]},

    requiredThings : {type: String , enum:["passbook","atm","creditCard","loanFacility"]}

},{timestamps:true})

module.exports = mongoose.model("user", userSchema);



