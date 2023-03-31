const mongoose = require('mongoose');
// const ObjectId=mongoose.Types.ObjectId
const accountSchema = new mongoose.Schema({
    // user: {type: ObjectId, trim:true, ref: 'user'},
    user:{
        type:String,
        require:true
    },
    fromAcName:{
        type:String,
        require:true
    },
    toAcName:{
        type:String,
        require:true
    },
    balance:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["received","send","cancle"]
    },
    totalBlance:{
        type:Number,
        require:true
    }

},{
    timestamps:true
});

module.exports=mongoose.model("account",accountSchema)
// account -> user, accBal-> no, accStatus -> ref user,  statement -> array of object with time details [credit, debit],  