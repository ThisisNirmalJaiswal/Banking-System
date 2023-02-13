const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, "please put userName"] },
    fatherName: { type: String, required: [true, "please put Father Name"] },
    aadharCard: { type: Number, required: [true, "aadhar card mandatory"], unique: true },
    panCard: { type: String, required: [true, "pan card mandatory"], unique: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true }
    },
    accountType: { type: String, required: [true, "please put accountType here"], enum: ["savingAccount", "currentAccount"] },
    accountStatus: { type: String, default: "Pending" },
    accountBalance: { type: Number, required: [true, "accountBalanceMinimum - 1000 for saving account and 10000 for currentAccount "], enum:["1000"] },
    accountNumber:{type: Number},
    requiredThings: { type: String, enum: ["Passbook", "Debit Card", "Credit Card", "Loan Facility"] }
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema);




