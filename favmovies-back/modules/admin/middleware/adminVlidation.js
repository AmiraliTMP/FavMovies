const JWTToken = require('jsonwebtoken');
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const adminRepository = require('../repositories/admin.repositories');
const transform = require("../../../utilities/apiResponse");
const Validator=require('./../../../utilities/Validator');
var mongoose = require('mongoose');
var fs = require('fs');

exports.AuthenticationAdmin = async (request, response, next) => {
    // let adminId;
    
    // if (Request.headers.authorization && Request.headers.authorization.split(' ')[0] == 'Bearer') {
        
    //     let token = Request.headers.authorization.split(' ')[1];
        
    //     var decodeOldToken;
    //     var oldAccessToken;
    //     try {
    //         decodeOldToken = CryptoJS.AES.decrypt(token, process.env.ACCESS_TOKEN_SECRET_bcryptjs);
    //     } catch (error) {
    //         return transform.Forbidden(Response, 'هنگام رمزگشایی  خطایی روی داد. لطفاً توکن خود را بررسی کنید یا با مدیر سیستم تماس بگیرید.','An error occurred while decoding. Please check your token or contact your system administrator.', 'Authorization');
    //     }

    //     try {
    //         oldAccessToken = decodeOldToken.toString(CryptoJS.enc.Utf8);
    //     } catch (error) {
    //         return transform.Forbidden(Response, 'هنگام رمزگشایی  خطایی روی داد. لطفاً توکن خود را بررسی کنید یا با مدیر سیستم تماس بگیرید.','An error occurred while decoding. Please check your token or contact your system administrator.', 'Authorization');
    //     }

    //     await JWTToken.verify(oldAccessToken, fs.readFileSync(process.env.ACCESS_TOKEN_SECRET_KEY), { algorithms: [process.env.ACCESS_TOKEN_ALGORITHM] }, async (tokenError, decodedToken) => {
    //         if (tokenError) {
    //             console.log("tokenError:   ", tokenError);
    //             return transform.BadRequest(Response, 'توکن وارد شده نامعتبر است، لطفاً آن را بررسی کرده و دوباره وارد کنید.','The token entered is invalid, please check and re-enter.', 'Authorization');
    //         } else {
    //             if (decodedToken.exp * 1000 < Date.now()) {
    //                 return transform.unauthorizedResponse(Response, 'اعتبار توکن وارد شده گذشته است، لطفاً توکن جدید دریافت کنید و دوباره وارد شوید.','The entered token has expired, please get a new token and log in again.', 'Authorization');
    //             } else {
    //                 var verifiedOldAccessTokenPayload = CryptoJS.AES.decrypt(decodedToken.payload, process.env.SECRET_bcryptjs_ID);
    //                 var payloadDecryptAccessToken = verifiedOldAccessTokenPayload.toString(CryptoJS.enc.Utf8);
    //                 adminId = payloadDecryptAccessToken;
    //                 if ((mongoose.Types.ObjectId.isValid(adminId)) === true) {
                   
                        
    //                     Request.admin = await adminRepository.findbyId(adminId);
                        
    //                     Next();
    //                     return;
    //                 }
    //             }
    //         }
    //     });
    // } else {
    //     return transform.unauthorizedResponse(Response, 'شما وارد نشده اید. ابتدا وارد شوید و سپس دوباره تلاش کنید.','You are not logged in. Log in first and then try again.');
    // }
    let token =
    (await request.body.accessToken) ||
    request.query.accessToken ||
    request.headers["authorization"];

  if (!token) {
    return transform.unauthorizedResponse(
      response,
      "شما وارد نشده اید.ابتدا وارد شوید وسپس دوباره تلاش کنید.",
      "You are not logged in. Please login first and then try again."
    );
  }

  if ((await token.split(" ")[0]) !== "Bearer") {
    return transform.unauthorizedResponse(response, "توکن وارد شده معتبر نیست","The token entered is not valid");
  }

  const accessToken = await token.split(" ")[1];

  if (!accessToken) {
    return transform.unauthorizedResponse(
      response,
      "شما وارد نشده اید.ابتدا وارد شوید وسپس دوباره تلاش کنید.",
      "You are not logged in. Please login first and then try again."
    );
  }

  return jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    async (error, decode) => {
      if (error) {
        return transform.unauthorizedResponse(response, "توکن وارد شده معتبر نیست","The token entered is not valid");
      }

      const admin = await adminRepository.findbyId(decode.id)

      if (!admin) {
        return transform.Forbidden(response, "توکن وارد شده معتبر نیست","The token entered is not valid");
      }

    //   const url = await request.originalUrl;

    //   const section = await url.split("/")[1];
      
    //   const {  } = await admin;

    //   if (!Object.values().includes(section)) {
    //     return await transform.ForbiddenPermission(
    //       response,
    //       "شما به این قسمت دسترسی ندارید",
    //         "you dont have permission to this part"

    //     );
    //   }

      request.admin = await admin;

      return next();
    }
  );
};

exports.createRefreshTokenValidiate = (req, res, next) => {
    let oldAccessToken = req.body.oldAccessToken
    let oldRefreshToken = req.body.oldRefreshToken
    
   //oldAccessToken
    if(!Validator.IsDefined(oldAccessToken).Success) {
        return transform.BadRequest(res,Validator.IsDefined(oldAccessToken).Message,"oldAccessToken")        
    }        
    if(!Validator.IsntEmpty(oldAccessToken).Success){
        return transform.BadRequest(res,Validator.IsntEmpty(oldAccessToken).Message,"oldAccessToken")  
    } 
    if(!Validator.IsString(oldAccessToken).Success){
        return transform.BadRequest(res,Validator.IsString(oldAccessToken).Message,"oldAccessToken")  
    } 

    //oldRefreshToken
    if(!Validator.IsDefined(oldRefreshToken).Success) {
        return transform.BadRequest(res,Validator.IsDefined(oldRefreshToken).Message,"oldRefreshToken")        
    }        
    if(!Validator.IsntEmpty(oldRefreshToken).Success){
        return transform.BadRequest(res,Validator.IsntEmpty(oldRefreshToken).Message,"oldRefreshToken")  
    } 
    if(!Validator.IsString(oldRefreshToken).Success){
        return transform.BadRequest(res,Validator.IsString(oldRefreshToken).Message,"oldRefreshToken")  
    } 
   

    next()
    return

}

exports.editAdminFromPanel=(req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let userName = req.body.userName;
    let password = req.body.password;
    let id = req.body.adminId;
  
    //id
    if (!Validator.IsDefined(id).Success) {
      return transform.BadRequest(
        res,
        Validator.IsDefined(id).Message,
        Validator.IsDefined(id).en_Message,
        "adminId"
      );
    }
    if (!Validator.IsObjectId(id).Success) {
      return transform.BadRequest(
        res,
        Validator.IsObjectId(id).Message,
        Validator.IsObjectId(id).en_Message,
        "id"
      );
    }
    //firstName
    if (Validator.IsDefined(firstName).Success) {
      if (!Validator.IsString(firstName).Success) {
        return transform.BadRequest(
          res,
          Validator.IsString(firstName).Message,
          Validator.IsString(firstName).en_Message,
          "firstName"
        );
      }
    }
  
    //lastName
    if (Validator.IsDefined(lastName).Success) {
      if (!Validator.IsString(lastName).Success) {
        return transform.BadRequest(
          res,
          Validator.IsString(lastName).Message,
          Validator.IsString(lastName).en_Message,
          "lastName"
        );
      }
    }
  
    //userName
    if (Validator.IsDefined(userName).Success) {
      if (!Validator.IsString(userName).Success) {
        return transform.BadRequest(
          res,
          Validator.IsString(userName).Message,
          Validator.IsString(userName).en_Message,
          "userName"
        );
      }
      if (!Validator.isvalidUserName(userName).Success) {
        return transform.BadRequest(
          res,
          Validator.isvalidUserName(userName).Message,
          Validator.isvalidUserName(userName).en_Message,
          "userName"
        );
      }
    }
  
    //password
    if (Validator.IsDefined(password).Success) {
      if (!Validator.IsntEmpty(password).Success) {
        return transform.BadRequest(
          res,
          Validator.IsntEmpty(password).Message,
          Validator.IsntEmpty(password).en_message,
          "password"
        );
      }
      if (!Validator.isValidPassword(password).Success) {
        return transform.BadRequest(
          res,
          Validator.isValidPassword(password).Message,
          Validator.isValidPassword(password).en_Message,
          "password"
        );
      }
    }
  
    next();
    return;
  };

  exports.editAdminMyProfile=(req, res, next) => {
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let userName = req.body.userName
    let password = req.body.password
 
    

    //firstName
    if(Validator.IsDefined(firstName).Success) {
        if(!Validator.IsString(firstName).Success){
            return transform.BadRequest(
                res,
                Validator.IsString(firstName).Message,
                Validator.IsString(firstName).en_Message,
                "firstName"
            )  
        }      
    }  

    //lastName
    if(Validator.IsDefined(lastName).Success) {
        if(!Validator.IsString(lastName).Success){
            return transform.BadRequest(
                res,
                Validator.IsString(lastName).Message,
                Validator.IsString(lastName).en_Message,
                "lastName"
            )  
        }
    }  

    //userName
    if(Validator.IsDefined(userName).Success) {
        if(!Validator.IsString(userName).Success){
            return transform.BadRequest(
                res,
                Validator.IsString(userName).Message,
                Validator.IsString(userName).en_Message,
                "userName"
            )  
        } 
        if(!Validator.isvalidUserName(userName).Success){
            return transform.BadRequest(
                res,
                Validator.isvalidUserName(userName).Message,
                Validator.isvalidUserName(userName).en_Message,
                "userName"
            )  
        }
    }        
   
    //password
    if(Validator.IsDefined(password).Success) {
        if(!Validator.IsntEmpty(password).Success){
            return transform.BadRequest(
                res,
                Validator.IsntEmpty(password).Message,
                Validator.IsntEmpty(password).en_message,
                "password"
            )  
        }     
        if(!Validator.isValidPassword(password).Success){
            return transform.BadRequest(
                res,
                Validator.isValidPassword(password).Message,
                Validator.isValidPassword(password).en_Message,
                "password"
            )  
        } 
    }  

    
    next();
    return;
    
}

exports.IdPrameterValidation=(req, res, next) => {
    let id = req.params.adminId;
    
     //id
     if (!Validator.IsDefined(id).Success) {
        return transform.BadRequest(
          res,
          Validator.IsDefined(id).Message,
          Validator.IsDefined(id).en_Message,
          "adminId"
        );
      }
      if (!Validator.IsntEmpty(id).Success) {
        return transform.BadRequest(
          res,
          Validator.IsntEmpty(id).Message,
          Validator.IsntEmpty(id).en_message,
          "adminId"
        );
      }
      if (!Validator.IsObjectId(id).Success) {
        return transform.BadRequest(
          res,
          Validator.IsObjectId(id).Message,
          Validator.IsObjectId(id).en_Message,
          "adminId"
        );
      }
    
      next();
      return;
}
exports.IdPrameterValidationUser=(req, res, next) => {
    let id = req.params.userId;
    
     //id
     if (!Validator.IsDefined(id).Success) {
        return transform.BadRequest(
          res,
          Validator.IsDefined(id).Message,
          Validator.IsDefined(id).en_Message,
          "userId"
        );
      }
      if (!Validator.IsntEmpty(id).Success) {
        return transform.BadRequest(
          res,
          Validator.IsntEmpty(id).Message,
          Validator.IsntEmpty(id).en_message,
          "userId"
        );
      }
      if (!Validator.IsObjectId(id).Success) {
        return transform.BadRequest(
          res,
          Validator.IsObjectId(id).Message,
          Validator.IsObjectId(id).en_Message,
          "userId"
        );
      }
    
      next();
      return;
}

exports.insertAdminfromPanel= (req, res, next) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let userName = req.body.userName
  let password = req.body.password



  //firstName
  if(!Validator.IsDefined(firstName).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(firstName).Message,
          Validator.IsDefined(firstName).en_Message,
          "firstName"
      )        
  }        
  if(!Validator.IsntEmpty(firstName).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(firstName).Message,
          Validator.IsntEmpty(firstName).en_message,
          "firstName"
      )  
  } 
  if(!Validator.IsString(firstName).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(firstName).Message,
          Validator.IsString(firstName).en_Message,
          "firstName"
      )  
  } 

  //lastName
  if(!Validator.IsDefined(lastName).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(lastName).Message,
          Validator.IsDefined(lastName).en_Message,
          "lastName"
      )        
  }        
  if(!Validator.IsntEmpty(lastName).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(lastName).Message,
          Validator.IsntEmpty(lastName).en_message,
          "lastName"
      )  
  } 
  if(!Validator.IsString(lastName).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(lastName).Message,
          Validator.IsString(lastName).en_Message,
          "lastName"
      )  
  } 

  //userName
  if(!Validator.IsDefined(userName).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(userName).Message,
          Validator.IsDefined(userName).en_Message,
          "userName"
      )        
  }        
  if(!Validator.IsntEmpty(userName).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(userName).Message,
          Validator.IsntEmpty(userName).en_message,
          "userName"
      )  
  } 
  if(!Validator.IsString(userName).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(userName).Message,
          Validator.IsString(userName).en_Message,
          "userName"
      )  
  } 
  if(!Validator.isvalidUserName(userName).Success){
      return transform.BadRequest(
          res,
          Validator.isvalidUserName(userName).Message,
          Validator.isvalidUserName(userName).en_Message,
          "userName"
      )  
  } 

  //password
  if(!Validator.IsDefined(password).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(password).Message,
          Validator.IsDefined(password).en_Message,
          "password"
      )        
  }        
  if(!Validator.IsntEmpty(password).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(password).Message,
          Validator.IsntEmpty(password).en_message,
          "password"
      )  
  }     
  if(!Validator.isValidPassword(password).Success){
      return transform.BadRequest(
          res,
          Validator.isValidPassword(password).Message,
          Validator.isValidPassword(password).en_Message,
          "password"
      )  
  }   



  next();
  return;
}

exports.login=(req, res, next) => {
  let userName = req.body.userName
  let password = req.body.password


  //userName
  //چک کردن وجود فیلد
  if(!Validator.IsDefined(userName).Success) {
      return transform.BadRequest(res,Validator.IsDefined(userName).Message,"userName")        
  } 
  
  //چک کردن خالی نبودن
  if(!Validator.IsntEmpty(userName).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(userName).Message,
          Validator.IsntEmpty(userName).en_message,
          "userName"
      )  
  } 
  //الزامی بودن رشته بودن
  if(!Validator.IsString(userName).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(userName).Message,
          Validator.IsString(userName).en_Message,
          "userName"
      )  
  } 
  

  //password
  if(!Validator.IsDefined(password).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(password).Message,
          Validator.IsDefined(password).en_Message,
          "password"
      )        
  }        
  if(!Validator.IsntEmpty(password).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(password).Message,
          Validator.IsntEmpty(password).en_message,
          "password"
      )  
  }     
  if(!Validator.IsString(password).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(password).Message,
          Validator.IsString(password).en_Message,
          "password"
      )  
  } 


  next();
  return;
}


