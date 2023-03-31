const userSchema = require("../models/userModel")

const { st, pass, num, em } = require('../validation/validation')


const createUser = async function (req, res) {
    try {
        let data = req.body
        let { fullName, fatherName, address, aadharCard, panCard, requiredThings, accountBalance } = data

        if (!(fullName)) return res.status(404).send({ status: false, message: "shouldProvideUserName" })
        if (!st(fullName)) return res.status(400).send({ status: false, message: "name should have only characters" })
        // if(await userSchema.findOne({accountNumber}) == ) return res.status(400).send({status: false, message: "username should be unique"})
        // 
        if (!(fatherName)) return res.status(404).send({ status: false, message: "shouldProvideFatherName" })
        if (!st(fatherName)) return res.status(400).send({ status: false, message: "father Name should have only characters" })

        if (!(address)) return res.status(404).send({ status: false, message: "Please enter your address" })
        // if(!address && )
        //    let addressNew = JSON.parse(address);
        console.log(address);

        if (!(aadharCard)) return res.status(404).send({ status: false, message: "shouldProvideAadharCard" })
        if (await userSchema.findOne({ aadharCard })) return res.status(400).send({ status: false, message: "aadharCard should be unique" })

        if (!(panCard)) return res.status(404).send({ status: false, message: "shouldProvidePanCard" })
        if (await userSchema.findOne({ panCard })) return res.status(400).send({ status: false, message: "panCard should be unique" })

        if (!(accountBalance)) return res.status(404).send({ status: false, message: "shouldProvideMinimumAccountBalance" });

        data.accountNumber = "3020" + Math.floor(Math.random() * 100000);

        let userData = await userSchema.create(data);
        console.log(userData);
        // console.log(timestamps)

        return res.status(201).send({ status: "pending", message: "Form submitted successfully" })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}




const updateAccountStatus = async (req, res) => {
    try {
        let data = req.body;
        let userId = req.param.userId;
        const { accountStatus } = data
        let updateStatus = await userSchema.findOneAndUpdate({ _id: userId }, { accountStatus: "open" }, { new: true });
        return res.status(200).send({ status: true, message: "account updated", updateStatus })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
    }
}


module.exports = { createUser,  updateAccountStatus };