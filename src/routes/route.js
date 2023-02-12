const express = require('express');
const router = express.Router();

router.get("/hey", (req, res)=>{
    res.send("<h1>badhai ho mc</h1>");
});

module.exports = router;