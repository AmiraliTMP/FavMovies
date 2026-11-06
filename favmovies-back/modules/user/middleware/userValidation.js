const transform = require("../../../utilities/apiResponse");
const otpConstants = require("../../../utilities/OtpConstance");
const userRepositories = require("../repositories/user.repositories"); //userRepositories
const Validator = require("../../../utilities/Validator");
const jwt = require("jsonwebtoken");

exports.AuthenticationUser = (req, res, next) => {
  let token =
    req.body.accessToken ||
    req.query.accessToken ||
    req.headers["authorization"];
  if (!token) {
    return transform.unauthorizedResponse(
      res,
      "شما وارد نشده اید.ابتدا وارد شوید وسپس دوباره تلاش کنید.",
      "You are not logged in. Please login first and then try again."
    );
  } else {
    if (token.split(" ")[0] !== "Bearer") {
      return transform.unauthorizedResponse(
        res,
        "توکن وارد شده معتبر نیست",
        "The token entered is not valid."
      );
    }

    let accessToken = token.split(" ")[1];
    if (accessToken) {
      return jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        async (error, decode) => {
          if (error) {
            return transform.unauthorizedResponse(
              res,
              "توکن وارد شده معتبر نیست",
              "The token entered is not valid."
            );
          } else {
            if (Number(decode.expiredIn) < Number(Date.now())) {
              return transform.unauthorizedResponse(
                res,
                "اعتبار توکن وارد شده گذشته است، لطفاً توکن جدید دریافت کنید و دوباره وارد شوید.",
                "The entered token has expired, please get a new token and log in again."
              );
            } else {
              const user = await userRepositories.findUserId(decode.id);
              if (!user) {
                return transform.unauthorizedResponse(
                  res,
                  "توکن وارد شده معتبر نیست",
                  "The token entered is not valid."
                );
              }

              req.user = await user;
            }
          }
          return next();
        }
      );
    } else {
      return transform.Forbidden(
        res,
        "شما وارد نشده اید.ابتدا وارد شوید وسپس دوباره تلاش کنید.",
        "You are not logged in. Please login first and then try again."
      );
    }
  }
};

exports.editMyProfileUser = (req, res, next) => {
  let userName = req.body.userName;
  let mobile = req.body.mobile;
  let password = req.body.password;
  let email = req.body.email;


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

 

  //email
  if (Validator.IsDefined(email).Success) {
    if (!Validator.IsntEmpty(email).Success) {
      return transform.BadRequest(
        res,
        Validator.IsntEmpty(email).Message,
        Validator.IsntEmpty(email).en_message,
        "email"
      );
    }
    if (!Validator.IsEmail(email).Success) {
      return transform.BadRequest(
        res,
        Validator.IsEmail(email).Message,
        Validator.IsEmail(email).en_Message,
        "email"
      );
    }
  }

  next();
  return;
};

exports.editUserFromPanel = (req, res, next) => {
  let userName = req.body.userName
  let mobile = req.body.mobile
  let userId=req.body.userId
  let email=req.body.email



  
  //userId
  if(!Validator.IsDefined(userId).Success) {
      return transform.BadRequest(
        res,
        Validator.IsDefined(userId).Message,
        Validator.IsDefined(userId).en_Message,
        "id"
      )        
  }

  if(!Validator.IsObjectId(userId).Success){
      return transform.BadRequest(
        res,
        Validator.IsObjectId(userId).Message,
        Validator.IsObjectId(userId).en_Message,
        "id"
      )  
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
      if(!Validator.IsntEmpty(userName).Success){
        return transform.BadRequest(
          res,
          Validator.IsntEmpty(userName).Message,
          Validator.IsntEmpty(userName).en_message,
          "username"
        )
      }
  }             
  
  //mobile
  if(Validator.IsDefined(mobile).Success) {
      if(!Validator.IsIranMobile(mobile).Success){
          return transform.BadRequest(
            res,
            Validator.IsIranMobile(mobile).Message,
            Validator.IsIranMobile(mobile).en_Message,
            "mobile"
          )  
      }              
  }  


  //email
  if (Validator.IsDefined(email).Success) {
      if (!Validator.IsntEmpty(email).Success) {
        return transform.BadRequest(
          res,
          Validator.IsntEmpty(email).Message,
          Validator.IsntEmpty(email).en_message,
          "email"
        );
      }
      if (!Validator.IsEmail(email).Success) {
        return transform.BadRequest(
          res,
          Validator.IsEmail(email).Message,
          Validator.IsEmail(email).en_Message,
          "email"
        );
      }
    }
  
  

  
  next();
  return;
  
}

exports.IdPrameterValidation = (req, res, next) => {
  let id = req.params.userId;

  //id
  if (!Validator.IsDefined(id).Success) {
    return transform.BadRequest(
      res,
      Validator.IsDefined(id).Message,
      Validator.IsDefined(id).en_Message,
      "id"
    );
  }
  if (!Validator.IsntEmpty(id).Success) {
    return transform.BadRequest(
      res,
      Validator.IsntEmpty(id).Message,
      Validator.IsntEmpty(id).en_message,
      "id"
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

  next();
  return;
};

exports.insertUserfromPanel = (req, res, next) => {
  let userName = req.body.userName
  let mobile = req.body.mobile
  let email = req.body.email

  

  //userName
  if(Validator.IsDefined(userName).Success) {
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
  }        

  //mobile
  if(!Validator.IsDefined(mobile).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(mobile).Message,
          Validator.IsDefined(mobile).en_Message,
          "mobile"
      )             
  }   
  if(!Validator.IsIranMobile(mobile).Success){
      return transform.BadRequest(
          res,
          Validator.IsIranMobile(mobile).Message,
          Validator.IsIranMobile(mobile).en_Message,
          "mobile"
      )  
  }  
  
  //email
  if (Validator.IsDefined(email).Success) {

      if (!Validator.IsEmail(email).Success) {
        return transform.BadRequest(
          res,
          Validator.IsEmail(email).Message,
          Validator.IsEmail(email).en_Message,
          "email"
        );
      }
    }


  next();
  return;
}

exports.sendCodeActivition =(req, res, next) => {
  let mobile = req.body.mobile

  //mobile
  if(!Validator.IsDefined(mobile).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(mobile).Message,
          Validator.IsDefined(mobile).en_Message,
          "mobile"
      )        
  }        
  if(!Validator.IsntEmpty(mobile).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(mobile).Message,
          Validator.IsntEmpty(mobile).en_message,
          "mobile"
      )  
  } 
  if(!Validator.IsIranMobile(mobile).Success){
      return transform.BadRequest(
          res,
          Validator.IsIranMobile(mobile).Message,
          Validator.IsIranMobile(mobile).en_Message,
          "mobile"
      )  
  } 
  next()
  return
}

exports.submitOtp = (req, res, next) => {
  let sentCode  = req.body.sentCode
  let mobile = req.body.mobile


  //sentCode
  if(!Validator.IsDefined(sentCode).Success) {
      return transform.BadRequest(res,
        Validator.IsDefined(sentCode).Message,
        Validator.IsDefined(sentCode).en_Message,
        "sentCode"
      )        
  }        
  if(!Validator.IsntEmpty(sentCode).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(sentCode).Message,
          Validator.IsntEmpty(sentCode).en_message,
          "sentCode"
      )  
  } 
  if(!Validator.IsString(sentCode).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(sentCode).Message,
          Validator.IsString(sentCode).en_Message,
          "sentCode"
      )  
  } 

  //mobile
  if(!Validator.IsDefined(mobile).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(mobile).Message,
          Validator.IsDefined(mobile).en_Message,
          "mobile"
      )        
  }        
  if(!Validator.IsntEmpty(mobile).Success){
      return transform.BadRequest(
          res,
          Validator.IsntEmpty(mobile).Message,
          Validator.IsntEmpty(mobile).en_message,
          "mobile"
      )  
  } 
  if(!Validator.IsString(mobile).Success){
      return transform.BadRequest(
          res,
          Validator.IsString(mobile).Message,
          Validator.IsString(mobile).en_Message,
          "mobile"
      )  
  } 
  next()
  return
}

exports.emailValidation = (req, res, next) => {
  const email = req.body.email;
  if (!Validator.IsDefined(email).Success) {
    return transform.BadRequest(
      res,
      Validator.IsDefined(email).Message,
      Validator.IsDefined(email).en_Message,
      "email"
    );
  }
  if (!Validator.IsntEmpty(email).Success) {
    return transform.BadRequest(
      res,
      Validator.IsntEmpty(email).Message,
      Validator.IsDefined(email).en_Message,
      "email"
    );
  }
  if (!Validator.IsEmail(email).Success) {
    return transform.BadRequest(
      res,
      Validator.IsEmail(email).Message,
      Validator.IsDefined(email).en_Message,
      "email"
    );
  }
  next();
  return;
};

exports.changePhoneNumber=(req,res,next)=>{
  let newNumber=req.body.newNumber;
  let oldNumber=req.body.oldNumber;

  //newNumber
  if(!Validator.IsDefined(newNumber).Success) {
    return transform.BadRequest(
        res,
        Validator.IsDefined(newNumber).Message,
        Validator.IsDefined(newNumber).en_Message,
        "newNumber"
    )             
}   

if(!Validator.IsntEmpty(newNumber).Success){
  return transform.BadRequest(
      res,
      Validator.IsntEmpty(newNumber).Message,
      Validator.IsntEmpty(newNumber).en_message,
      "newNumber"
  )  
} 

  if(!Validator.IsIranMobile(newNumber).Success){
    return transform.BadRequest(
        res,
        Validator.IsIranMobile(newNumber).Message,
        Validator.IsIranMobile(newNumber).en_Message,
        "newNumber"
    )  
}  

  //oldNumber
 if(!Validator.IsDefined(oldNumber).Success) {
      return transform.BadRequest(
          res,
          Validator.IsDefined(oldNumber).Message,
          Validator.IsDefined(oldNumber).en_Message,
          "mobile"
      )             
  }  
  if(!Validator.IsntEmpty(oldNumber).Success){
    return transform.BadRequest(
        res,
        Validator.IsntEmpty(oldNumber).Message,
        Validator.IsntEmpty(oldNumber).en_message,
        "oldNumber"
    )  
  } 
  if(!Validator.IsIranMobile(oldNumber)){
      return transform.BadRequest(
          res,
          Validator.IsIranMobile(oldNumber).Message,
          Validator.IsIranMobile(oldNumber).en_Message,
          "mobile"
      )  
  }  

next();
return

}




