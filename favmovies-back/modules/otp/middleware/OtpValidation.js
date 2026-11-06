const OTPservice = require('../../../services/otp');
const Userservice = require('../../../services/user');
const otpConstants = require('../../../utile/OtpConstance');
const transforms = require('../../../utile/apiResponse');
const Validators = require('../../../utile/Validator');


module.exports = new class OtpValidations{

    async checkOtpConflict(req, res, next) {

        const data = await {...req.body};

        const mobile = await data.mobile;
        const request_type = await data.request_type;
        const findUser = await Userservice.findByMobile(mobile);

        const findOTP = await OTPservice.findByCondition({
            mobile: mobile,
            request_type: request_type,
            verify: false,
            expiryDate: {$gte: new Date()}
        })



        if(await findOTP){
            return transforms.conflict(res, "نمیتوانید به طور مکرر درخواست کنید!",'You cannot request repeatedly!');
        }


        switch(request_type){

            case otpConstants.LOGIN:
                if(!findUser){
                    return await transforms.notFound(res, "کاربر یافت نشد", 'User not found');
                }

                if(findUser && findUser.isDeleted === true){
                    return await transforms.notFound(res, "کاربر یافت نشد",'User not found');
                }

                if(findUser && findUser.isActive === false){
                    return await transforms.Forbidden(res, "نمیتوانید ثبت نام یا وارد شوید لطفا با مدیریت تماس بگیرید", "You can't register or log in, please contact the administration.");
                }

                break;

            case otpConstants.REGISTRATION:

                if(findUser && findUser.isActive === false){
                    return await transforms.Forbidden(res, "نمیتوانید ثبت نام یا وارد شوید لطفا با مدیریت تماس بگیرید","You can't register or log in, please contact the administration.");
                }

                if(findUser && findUser.isActive === true && findUser.isDeleted === false){
                    return await transforms.conflict(res, "این شماره موبایل در سیستم وجود دارد لطفا وارد شوید!", 'This mobile number is in the system, please log in!');
                }
                break


        }


        return await next();


    }

    async checkOTPFieldsV2(req, res, next){
        const data = await {...req.body}

        const mobile = await data.mobile;

        if(!mobile){
            return await transforms.BadRequest(res, "موبایل الزامی است!","Mobile is required!", "mobile")
        }


        if(await !Validators.IsIranMobile(mobile).Success){
            return await transforms.BadRequest(res, "شماره موبایل باید یازده رقم باشد!","Mobile number must be eleven digits!", "mobile")
        }

        return await next();
    }

    async checkOTPFields(req, res, next) {
        const data = await {...req.body}

        const request_type = await data.request_type;

        if(!(request_type)){
            return await transforms.BadRequest(res, "نوع درخواست برای ثبت کد الزامی است!","The request type is required to register the code!", "request_type");
        }

        if(!(Object.values(otpConstants).indexOf(request_type) > -1)){
            return await transforms.BadRequest(res, "نوع درخواست برای ثبت کد معتبر نیست","The request type for registering the code is not valid.", "request_type");
        }

        const mobile = await data.mobile;

        if(!mobile){
            return await transforms.BadRequest(res, "موبایل الزامی است!","Mobile is required!", "mobile")
        }


        if(await !Validators.IsMobile(mobile).Success){
            return await transforms.BadRequest(res, "شماره موبایل باید ده رقم و بدون صفر باشد!","Mobile number must be ten digits without zero!", "mobile")
        }

        return await next();
    }
}