const express = require('express');
const router = express.Router();
const {createAdmin, login}=require('../Controller/adminController')
const {createUser} = ("../controller/userController")

router.get("/hey", (req, res)=>{
    res.send("<h1>badhai ho mc</h1>");
});

router.post('/bank/admin',createAdmin)
router.post('/bank/admin/login', login)


router.post('bank/user',createUser)

module.exports = router;