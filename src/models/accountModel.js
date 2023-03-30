const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {type: ObjectId, trim:true, ref: 'user'}

});


// account -> user, accBal-> no, accStatus -> ref user,  statement -> array of object with time details [credit, debit],  