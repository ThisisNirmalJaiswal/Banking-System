const express = require('express');
const router = express.Router();
const {createAdmin, login}=require('../Controller/adminController');
const {createUser, getAllUsers,getUser,updateAccountStatus} = require("../Controller/userController");
const {authentication, authorization} = require("../auth/middleware");




router.post('/bank/admin', createAdmin)
router.post('/bank/admin/login', login)



router.post('/bank/user', createUser);
router.get("/bank/users", getAllUsers);
router.get("/bank/user", getUser);
router.put("/bank/user", authentication, authorization, updateAccountStatus )

router.all("*", (req, res)=>{
    res.send("There is something not good :(");
});




module.exports = router;