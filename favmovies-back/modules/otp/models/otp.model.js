const mongoose = require('mongoose');
const AbstractSchema = require("../../../schema/abstract.schema.js");
var {OTPTypeEnum}= require('../../../utilities/OtpConstance.js')

var otpModelSchema = new AbstractSchema({
  type: {type: String, required: false, default: OTPTypeEnum.REGISTRATION },
  mobile: { type: String,required: true },
  sentCode: { type: String, required: false },
  expiryDate: { type: Date, required: false,},
  verify :{ type: Boolean, default: false,required: true },
  insertDate: {type: Date, required: false, default: new Date()},
  updateDate: {type: Date, required: false,},
  deleteDate: { type: Date,required: false, }


});

module.exports=mongoose.model('otp', otpModelSchema);