const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema=mongoose.Schema
const accSch = new Schema(
{
    cust_id:{
        type:Number,
        minlength:6,
        required:true
    },
    primary_acc_holder:{
        type:String,
        required:true
    },
    secondary_acc_holder:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    acc_pin:{
        type:String,
        required:true
    },
    acc_balance:{
        type:Number,
        required:true
    },
    mobile_no:{
        type:Number,
        required:true
    },
    DOB:{
        type:String,
        required:true
    }
},
    {timestamps:true}
)

accSch.statics.addAcc = async function(cust_id,primary_acc_holder,secondary_acc_holder,branch,acc_pin,acc_balance,mobile_no,DOB){
    if(!cust_id||!primary_acc_holder || !secondary_acc_holder || !branch|| !acc_pin || !acc_balance || !mobile_no || !DOB){
        throw Error("All fields must be filled");
    }
    
    const checkAcc = await this.findOne({cust_id})
    
    if(checkAcc){
        throw Error("acc_number already exist")
    }

    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(acc_pin,salt);
    const user = await this.create({cust_id,primary_acc_holder,secondary_acc_holder,branch,acc_pin:hash,acc_balance,mobile_no,DOB})
    
    return user
}

accSch.statics.viewAcc = async function(cust_id,acc_pin){
    if(!cust_id || !acc_pin){
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({cust_id});
    if(!user){
        throw Error("Record do not exist")
    }

    const compare = await bcrypt.compare(acc_pin,user.acc_pin);
    
    if(!compare){
        throw Error("pin donot match");
    }

    return user;    
}

module.exports = mongoose.model("BankDetails",accSch)