const express = require('express');
const router = express.Router();
const {createAdmin}=require('../Controller/adminController')

router.get("/hey", (req, res)=>{
    res.send("<h1>badhai ho mc</h1>");
});

router.post('/bank/admin',createAdmin)

module.exports = router;