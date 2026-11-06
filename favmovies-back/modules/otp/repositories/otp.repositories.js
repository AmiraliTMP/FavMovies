const otpmodel = require("../models/otp.model");


module.exports = new class otpservices extends otpmodel{
    async InsertOtp(newOtp){
        
        return await otpmodel.create(newOtp);
    }

    async findByCondition(condition){
        return await otpmodel.findOne(condition);
    }

    async findForConfirmation(condition){
        return await otpmodel.findOne(condition);
    }

    async update(id,data){
        return await otpmodel.findByIdAndUpdate(id, data);
    }

}