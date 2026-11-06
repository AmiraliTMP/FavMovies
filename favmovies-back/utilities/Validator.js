const mongoose = require('mongoose');
module.exports= new class Validator {   
    IsntEmpty(Data){
        if(Data!=""){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"فیلد نمی تواند خالی باشد.",
                en_message :"The field cannot be empty."
            }
        }
    }

    IsDefined(Data){    
        if(Data!=undefined){
            return {
                Success:true, 
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"فیلد الزامی است.",
                en_Message:"This field is required.",
            }
        }
    }

    IsString(Data){
        if(typeof(Data)=="string"){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"فیلد به صورت رشته وارد شود.",
                en_Message:"Enter the field as a string.",
            }
        }   
    }

    IsNumber(Data){
        if(typeof(Data)=="number"){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"فیلد به صورت عدد وارد شود",
                en_Message:"Enter the field as a number.",
            }
        }   
    }

    IsBoolean(Data){
        if(typeof(Data)=="boolean"){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"فیلد به صورت صحیح و غلط وارد شود.",
                en_Message:"Enter the field correctly and incorrectly.",
            }
        }   
    }

    IsObjectId(Data){ 
        let ValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
        if(ValidMongoDbID.test(Data)){
            if(mongoose.Types.ObjectId.isValid(Data)){
                return {
                    Success:true,
                    Result:Data
                }
            } else {
                return {
                    Success:false,
                    Message:" فیلد آیدی به فرمت صحیح وارد شود",
                    en_Message:"Enter the field in objectId format.",
                }
            } 

        }else{
            return {
                Success:false,
                Message:"فیلد آیدی به فرمت صحیح وارد شود",
                en_Message:"Enter the field in objectId format.",
            }
        }
          
    }

    IsEmail(Data){
        const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(pattern.test(String(Data).toLowerCase())){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"آدرس ایمیل وارد شده معتبر نیست.",
                en_Message:"The email address entered is not valid.",
            }
        }
    }

    IsWebSite(Data){
        const pattern = new RegExp('^(http|https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if(pattern.test(Data)){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"آدرس سایت وارد شده معتبر نیست.",
                en_Message:"The entered site address is not valid.",
            }
        }
    }

    IsInstagram(Data){
        Data=Data.replace('https://www.instagram.com/','')
        let Exp=/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/             
        if(Data.match(Exp)){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"آدرس اینستاگرام وارد شده معتبر نیست.",
                en_Message:"The Instagram address entered is not valid.",
            }
        }
       
    }

    IsIranMobile(Data){
        const pattern = new RegExp(/^(?:98|\+98)?9[0-9]{9}$/);
        if(pattern.test(String(Data))){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"شماره تلفن وارد شده معتبر نیست.",
                en_Message:"The phone number entered is not valid.",
            }
        }
    }

    IsIranNationalCode(Data){
        if (!/^\d{10}$/.test(Data)){
            return {
                Success:false,
                Message:"کدملی وارد شده معتبر نیست.",
                en_Message:"The entered code is not valid.",
            }
        }
        var check = +Data[9];
        var sum = Array(9).fill().map((_, i) => +Data[i] * (10 - i)).reduce((x, y) => x + y) % 11;
        if((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"کدملی وارد شده معتبر نیست.",
                en_Message:"The entered code is not valid.",
            }
        }
    }

    Trim(Data) {
        if(Data!=undefined && Data.trim()){
            return {
                Success:true,
                Result:Data.trim()
            }
        } else {
            return {
                Success:false,
                Message:"Cannot trim this field."
            }
        }
    }

    TrimStart(Data) {
        if(Data!=undefined && Data.trimStart()){
            return {
                Success:true,
                Result:Data.trimStart()
            }
        } else {
            return {
                Success:false,
                Message:"Cannot trim start of this field."
            }
        }
    }

    TrimEnd(Data) {
        if(Data!=undefined && Data.trimEnd()){
            return {
                Success:true,
                Result:Data.trimEnd()
            }
        } else {
            return {
                Success:false,
                Message:"Cannot trim end of this field."
            }
        }
    }
    
    isvalidUserName(Data){        
        let Exp =/^[A-Za-z0-9_.-]{5,29}$/
        if(String(Data).match(Exp)){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"کاراکتر استفاده شده.غیر مجاز می باشد ",
                en_Message:"The character used is not allowed",
            }
        }   
    }

    isValidPassword(Data){
        if(6<=String(Data).length<=12 ){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"طول کلمه عبور باید بین 6 تا12 کاراکتر باشد.",
                en_Message:"The length of the password must be between 6 and 12 characters.",
            }
        }   
    }

    isSlug(Data){
        let Exp =/^[A-Za-z_]{2,100}$/
        if(String(Data).match(Exp)){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"کاراکتر استفاده شده.غیر مجاز می باشد ",
                en_Message:"The character used is not allowed",
            }
        }   
    }

    isRepetingArrayList(Data){
        let a=new Set(Data)
        if(a.length!=Data.length){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"لیست ارسالی تکراری است.",
                en_Message:"The mailing list is duplicate.",
            }
        }   

    }

    IsntEmptyArray(Data){
        if(Data.length!=0){
            return {
                Success:true,
                Result:Data
            }
        } else {
            return {
                Success:false,
                Message:"فیلد نمی تواند خالی باشد.",
                en_Message:"The field cannot be empty.",
            }
        }
    }

    IsInEnumList(data,enumlist){
        for (const key of Object.keys(enumlist)) {
            if(data==enumlist[key]){
                return {
                    Success:true,
                    Result:data
                }
            }
        }
        return {
            Success:false,
            Message:"مقدار وارد شده معتبر نیست.",
            en_Message:"The value entered is not valid.",

        }
    }
    
}