const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js");
const fs = require('fs');
const transform = require("./apiResponse");
// const OTPRepository = require("../services/otp");
const axios = require("axios");
const { log } = require("console");
// const { farazSendPattern } = require("@aspianet/faraz-sms");


module.exports = new class Userfunctions{


    createToken(userId){
        return {
            accessToken: JWT.sign({id: userId, expiredIn: "7d"}, process.env.ACCESS_TOKEN_SECRET_KEY),
            refreshToken: JWT.sign({id: userId, expiredIn: "30d"}, process.env.REFRESH_TOKEN_SECRET_KEY),
        };
    }


    async AdminCreateToken(request,user){    
           
        try{
         let baseUrl =  request.protocol + '://' +  request.get('host')
         let encryptId= CryptoJS.AES.encrypt(user._id.toString(), process.env.SECRET_bcryptjs_ID).toString();        
         
         let accessTokenExpireTime=(Number(process.env.ACCESS_TOKEN_EXPIRES_TIME)*60*60)
         
         let refreshTokenExpireTime=(Number(process.env.REFRESH_TOKEN_EXPIRES_TIME)*60*60)
       
         let accessTokenOptions = {
             expiresIn:accessTokenExpireTime,
             issuer:baseUrl,
             algorithm:process.env.ACCESS_TOKEN_ALGORITHM
         };
     
         let refreshTokenOptions = {
             expiresIn:refreshTokenExpireTime,
             issuer:baseUrl,
             algorithm:process.env.REFRESH_TOKEN_ALGORITHM
         };
     
        let accessToken = JWT.sign({payload:encryptId},fs.readFileSync(process.env.ACCESS_TOKEN_SECRET_KEY),accessTokenOptions);
        let refreshToken = JWT.sign({payload:encryptId},fs.readFileSync(process.env.REFRESH_TOKEN_SECRET_KEY),refreshTokenOptions);

        let tokens={
            accessToken:CryptoJS.AES.encrypt(accessToken,process.env.ACCESS_TOKEN_SECRET_bcryptjs).toString(),
            refreshToken:CryptoJS.AES.encrypt(refreshToken,process.env.REFRESH_TOKEN_SECRET_bcryptjs).toString()
         }
         return tokens

     }catch(err){console.log("error create token: ", err)  }   
    
 
   }

    async sendSms(mobile, code){
        console.log(mobile);
        
        let data = JSON.stringify({
            "code": process.env.FARAZ_PATTERN_CODE,
            "sender": process.env.FARAZ_SENDER,
            "recipient": `+98${mobile}`,
            "variable": {
              "otp-code": code
            }
          });

          
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://api2.ippanel.com/api/v1/sms/pattern/normal/send",
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.FARAZ_API_KEY,
            },
            data: data,
          };
        
        return await axios(config).then( (response) => {
                console.log(JSON.stringify(response.data));
                return true
                // return response.data && response.data.R_Success === true && true;
            })
            .catch( (error) => {
                console.debug(`error sending sms `,error);
                return false
            });
    }


    checkOTP(OTP, encoded){
        
        return bcrypt.compare(OTP, encoded).then((result) => {
            return result;
        }
    )}  
}  