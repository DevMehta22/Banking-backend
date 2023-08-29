const jwt = require("jsonwebtoken");
const Acc = require('../Models/accSchema')

const genToken = (_id)=>{
    return jwt.sign({_id},process.env.KEY,{expiresIn:"3d"});    
}

const addAccount =async(req,res)=>{
    const {cust_id,primary_acc_holder,secondary_acc_holder,branch,acc_pin,acc_balance,mobile_no,DOB} = req.body
    try{
        const user = await Acc.addAcc(cust_id,primary_acc_holder,secondary_acc_holder,branch,acc_pin,acc_balance,mobile_no,DOB)
        const token = genToken(user._id)
        res.status(200).json({cust_id,token})
    }catch(err){
        res.status(400).json({err:err.message})
    }
}

const viewAccount = async(req,res)=>{
    const{cust_id,acc_pin} = req.body
    try{
        const user = await Acc.viewAcc(cust_id,acc_pin)
        const token = genToken(user._id)
        res.status(200).json({user,token})
    }catch(err){
        res.status(400).json({err:err.message})
    }

}

module.exports={
    viewAccount,
    addAccount
}
