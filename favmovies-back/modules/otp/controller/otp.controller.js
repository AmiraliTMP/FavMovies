const transform = require('../../../utilities/apiResponse')
const otpRepositories = require('../repositories/otp.repositories')


module.exports = new class OtpController {

    async InsertOtp(req,res, newOtp){   
      try{
         return await otpRepositories.InsertOtp(newOtp)
      }catch (err) {
         return transform.BadRequest(res,err,'');
     }
    }  
  }
