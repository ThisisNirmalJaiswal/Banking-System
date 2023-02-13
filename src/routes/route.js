const express = require('express');
const router = express.Router();
const {createAdmin, login}=require('../Controller/adminController');
const {createUser, getAllUsers,getUser} = require("../Controller/userController");
const {authentication, authorization} = require("../auth/middleware");



router.get("/hey", (req, res)=>{
    res.send(short);
});

router.post('/bank/admin',createAdmin)
router.post('/bank/admin/login', login)



router.post('/bank/user',createUser);
router.get("/bank/users", getAllUsers);
router.get("/bank/user", getUser);



module.exports = router;