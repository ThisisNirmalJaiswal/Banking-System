const express = require('express');
const router = express.Router();
const {createAdmin,getAllUsers,getUser,login,getStatus,changeStatus}=require('../Controller/adminController');
const {createUser,updateAccountStatus} = require("../Controller/userController");
const {authentication, authorization} = require("../auth/middleware");
const {createTransaction,getTransaction}=require("../Controller/accountController")




router.post('/bank/admin', createAdmin)
router.post('/bank/admin/login', login)
router.get("/bank/admin", getAllUsers);
router.get("/bank/admin", getUser);
router.get("/bank/admin/status", getStatus);
router.patch("/bank/admin/status", changeStatus);



router.post('/bank/user', createUser);
//router.put("/bank/user", authentication, authorization, updateAccountStatus)

//router.post("/bank/account", createTransaction )
//router.get("/bank/account", getTransaction )

router.all("*", (req, res)=>{
    res.send("There is something not good :(");
});




module.exports = router;