const bcryptjs = require("bcryptjs");
const transform = require("../../../utilities/apiResponse");
const userRepositories = require("../repositories/user.repositories");
const serviceotp = require("../../otp/repositories/otp.repositories");
const otpConstants = require("../../../utilities/OtpConstance");
const functions = require("../../../utilities/functions");



module.exports = new (class UserController {
  async InsertUserbyPanel(req, res) {
    const { userName, mobile, email, getnews } = await req.body;

    //Check if the provided mobile already exists in the database
    let user = await userRepositories.findOne({ mobile });
    if (user) {
      return transform.conflict(
        res,
        "شماره تلفن وارد شده، از قبل در سامانه وجود دارد.",
        "The entered phone number already exists in the system."
      );
    }

    let data = {
      mobile,
    };

    if (userName) {
      let user = await userRepositories.findOne({ userName });
      if (user) {
        return transform.conflict(
          res,
          "نام کاربری تکراری است.",
          "Duplicate username."
        );
      }
      data.userName = await userName;
    }

    if (email) {
      let user = await userRepositories.findOne({ email: email });
      if (user) {
        return transform.conflict(
          res,
          "ایمیل  تکراری است.",
          "Duplicated email."
        );
      }
      data.email = await email;
    }
    if(getnews){
      data.getnews = await getnews;
    }
    const new_user = await userRepositories.create(data);
    await walletRepository.create({
                  user: new_user._id,
                  balance: 0,
                  isLocked: false,
                  currency: 'IRT'})
    return transform.successRespond(
      res,
      "ثبت نام کاربر با موفقیت انجام شد.",
      "User registration was successful.",
      new_user
    )

  }

  async finduserById(req, res) {
    let id = req.params.userId;

    const current_user = await userRepositories.findUserId(id);
    return await transform.successRespond(
      res,
      "کاربر یافت شد",
      "user found successfully",
      current_user
    );
  }

  async getMyprofile(req, res) {
    let { user } = req;
    return await transform.successRespond(
      res,
      "کاربر یافت شد",
      "user found successfully",
      user
    );
  }
  async getUserProfileById(req, res) {
    const { id } = req.params;
  
    const user = await userRepositories.findUserId(id);
  
    if (!user) {
      return transform.notFoundRespond(
        res,
        "کاربر یافت نشد",
        "User not found"
      );
    }
  
    return transform.successRespond(
      res,
      "کاربر یافت شد",
      "User found successfully",
      user
    );
  }
  async findAllUser(req, res) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 40;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const search = req.query.search ? req.query.search : null;
      const pagination = req.query.pagination === "true";
      const role = req.query.role ? req.query.role : null;
  
      const query = { isDeleted: false };
  
      if (role) {
        query.role = role;
      }
  
      if (search) {
        query.$or = [
          { mobile: { $regex: new RegExp(search, "i") } },
          { userName: { $regex: new RegExp(search, "i") } }
        ];
      }
  
      let UserList = null;
      if (pagination) {
        const options = {
          page: page,
          limit: limit,
        };
        UserList = await userRepositories.paginate(query, options);
      } else {
        UserList = await userRepositories.findAll(query);
      }
  
      return transform.successRespond(
        res,
        "Users found successfully.",
        "Users found successfully.",
        UserList
      );
  
    } catch (error) {
      return transform.errorRespond(res, error.message, "Error fetching users");
    }
  }
  

  async EditUserByAdmin(req, res) {
    const { userId, userName, mobile, email, getnews, expiredDatepackage, imageId } = req.body;
  
    let current_user = await userRepositories.findUserId(userId);
    if (!current_user) {
      return transform.notFoundRespond(
        res,
        "کاربری با این آیدی یافت نشد",
        "user with this userid does not exist"
      );
    }
  
    if (userName) {
      let user = await userRepositories.findOne({
        userName,
        _id: { $ne: userId },
      });
      if (user) {
        return transform.conflict(
          res,
          "نام کاربری تکراری است.",
          "The entered user name already exists in the system."
        );
      }
      current_user.userName = userName;
    }
  
    if (email) {
      let user = await userRepositories.findOne({
        email,
        _id: { $ne: userId },
      });
      if (user) {
        return transform.conflict(
          res,
          "ایمیل تکراری است.",
          "Duplicate email."
        );
      }
      current_user.email = email;
    }
  
    if (mobile) {
      let user = await userRepositories.findOne({
        mobile,
        _id: { $ne: userId },
      });
      if (user) {
        return transform.conflict(
          res,
          "شماره تلفن وارد شده، از قبل در سامانه وجود دارد.",
          "The entered phone number already exists in the system."
        );
      }
      current_user.mobile = mobile;
    }
  
    if (getnews !== undefined) {
      current_user.getnews = getnews;
    }
  
    if (expiredDatepackage) {
      current_user.expiredDatepackage = expiredDatepackage;
    }
  
    if (imageId) {
      current_user.imageId = imageId;
    }
  
    await current_user.save();
  
    return transform.successRespond(
      res,
      "تغییر اطلاعات کاربر با موفقیت انجام شد",
      "Updating successfully",
      current_user
    );
  }
  async EditMyProfile(req, res) {
    const { userName, email, imageId } = req.body;  // imageId را هم بگیر
    let current_user = req.user;
    const id = current_user.id;
  
    if (userName) {
      let user = await userRepositories.findOne({ userName, _id: { $ne: id } });
      if (user) {
        return transform.conflict(
          res,
          "نام کاربری تکراری است.",
          "The entered user name already exists in the system."
        );
      }
      current_user.userName = userName;
    }
  
    if (email) {
      let user = await userRepositories.findOne({ email, _id: { $ne: id } });
      if (user) {
        return transform.conflict(
          res,
          "ایمیل تکراری است.",
          "Duplicate email."
        );
      }
      current_user.email = email;
    }
  
    // اضافه کردن پشتیبانی برای آپدیت تصویر
    if (imageId) {
      // می‌توانی اعتبارسنجی کنی که imageId معتبر است یا نه
      current_user.imageId = imageId;
    }
  
    await current_user.save();
  
    return transform.successRespond(
      res,
      "تغییر اطلاعات کاربر با موفقیت انجام شد",
      "updating successfully",
      current_user
    );
  }

  async deleteUserByAdmin(req, res) {
    const id = req.body.userId;

    let findUser = await userRepositories.findOne({ _id: id });

    if (!findUser) {
      return transform.notFoundRespond(
        res,
        "کاربر یافت نشد",
        "user not found"
        );
    }

    //soft delete
    findUser.isDeleted = await true;
    const now = await new Date();
    findUser.deletedDate = await now;
    await findUser.save();

    return transform.successRespond(
      res,
      "کاربر با موفقیت حذف شد",
      "user deleted successfully"
    );
  }

  async deleteMyProfile(req, res) {
    let user = req.user;

    //soft delete
    user.isDeleted = await true;
    const now = await new Date();
    user.deletedDate = await now;
    await user.save();

    return transform.successRespond(
      res,
      "کاربر با موفقیت حذف شد",
      "user deleted successfully"
    );
  }

  async sendCodeActivition(req, res) {
    const data = await { ...req.body };
    const mobile = await data.mobile;
    const RandomNumber =
      Math.floor(Math.floor(10000 + Math.random() * 90000)) + 1;
    const salt = bcryptjs.genSaltSync(10);
    const HashRandomNumber = bcryptjs.hashSync(String(RandomNumber), salt);
    const expireActivationCodeDate = new Date().setMinutes(
      new Date().getMinutes() + 2
    );

    let typeOTP = otpConstants.OTPTypeEnum.LOGIN;

    const findOTP = await serviceotp.findByCondition({
      mobile: mobile,
      verify: false,
      expiryDate: { $gte: await new Date() },
    });

    if (findOTP) {
      return await transform.conflict(
        res,
        "نمیتوانید به طور مکرر درخواست کنید!",
        "You cannot request repeatedly!"
      );
    }

    const findUser = await userRepositories.findOne({ mobile });

    if (!findUser) {
      typeOTP = otpConstants.OTPTypeEnum.REGISTRATION;
    }

    let newOtp = {
      request_type: typeOTP,
      mobile: await data.mobile,
      sentCode: HashRandomNumber,
      expiryDate: expireActivationCodeDate,
      verify: false,
      InsertDate: new Date(),
    };

    let smsText = "کد تایید ورود به بارسرا    : " + RandomNumber;
    let isSend = true
    // let isSend = await functions.sendSms([data.mobile],RandomNumber);
    // console.log(isSend);
    
    // const isSend = true;
    if (isSend) {
      await serviceotp.InsertOtp(newOtp);

      return await transform.successRespond(
        res,
        "کد تایید با موفقیت ارسال شد",
        "Verification code sent successfully",
        RandomNumber
      );
    }

    return await transform.conflict(
      res,
      "کد ارسال نشد لطفا بعدا تلاش کنید!",
      "The code could not be sent, please try again later!"
    );
  }

  async LoginOTP(req, res) {
    const data = await { ...req.body };
    const code = await data.sentCode;
    const mobile = await data.mobile;

    // const push_token = data.push_token;

    const findOTP = await serviceotp.findForConfirmation({
      mobile: mobile,
      verify: false,
      expiryDate: { $gte: await new Date() },
    });

    if (!findOTP) {
      return await transform.BadRequest(
        res,
        "کد تایید نامعتبر است",
        "The verification code is invalid.",
        code
      );
    }
    // const a = findOTP.sentCode

    const check_otp = await functions.checkOTP(code, findOTP.sentCode);

    if (!check_otp) {
      return await transform.BadRequest(
        res,
        "کد تایید نامعتبر است",
        "The verification code is invalid.",
        "code"
      );
    }

    findOTP.verify = true;
    await findOTP.save();

    //check if user exists by mobile
    let user = await userRepositories.findOne({ mobile });


  if (!user) {
    await userRepositories.create({ mobile });
    user = await userRepositories.findOne({ mobile }); // Refresh user after creation
  }

  const id = user._id;
  const tokens = functions.createToken(id);

    return transform.successRespond(
       res,
       "کاربر با موفقیت وارد شد", 
       "user login was successful",
       {tokens}
      );
  }

  async CheckMyEmail(req, res) {
    const { user } = await req;

    const registered_username = (await user.userName) ? true : false;

    return transform.successRespond(
      res,
      "وضعیت ثبت نام کاربری با موفقیت یافت شد",
      "status of username is found",
      { registered_username }
    );
  }

  async createEmailUser(req, res) {
    let current_user = await req.user;
    const { email } = await req.body;
    const {userName}= await req.body;
    const {getnews}= await req.body;

    //check if email is already exisit or not
    if(email){
    const finduser = await userRepositories.findOne({
      email: email,
      userName :userName,
      _id: { $ne: current_user._id },
    });
    if (finduser) {
      return transform.conflict(
        res,
        "ایمیل تکراری است",
        "the email already exisits"
      );
    }
    current_user.email = await email;
  }
    if(!userName){
      return transform.BadRequest(res,"فیلد نام کاربری اجباری است ","you must enter username")
    }
    if(userName){
      const finduserbyusername =await userRepositories.findOne(
        {
          userName:userName,
          _id:{$ne:current_user._id}
        }
      )
      if(finduserbyusername){
        return transform.BadRequest(res,"این نام کاربری تکراری است","this username has already taken ")
      }
      current_user.userName = await  userName
    }
    
    
    
    current_user.getnews = await getnews
    await current_user.save();

    return transform.successRespond(
      res,
      "کاربر با موفقیت ایجاد شد",
      "Email created successfully",
      current_user
    );
  }

  async changePhoneNumber(req,res){
    const {newNumber,oldNumber}=req.body;


    //check if old number is exists or not
    let current_user = await userRepositories.findOne({ mobile: oldNumber });
    if (!current_user) {
      return transform.conflict(
        res,
        "کاربری با این شماره وجود ندارد",
        "user with this number not found"
      );
    }

    //check if new number is exists or not
    const finduser = await userRepositories.findOne({ mobile: newNumber });
    if (finduser) {
      return transform.conflict(
        res,
        "شماره جدید وارد شده تکراری است",
        "new number is exists already"
      );
    }

    current_user.mobile = await newNumber;
    await current_user.save();

    return transform.successRespond(
      res,
      "تغییر شماره با موبایل با موفقیت انجام شد",
      "phone number changed successfully"
    );
  }
  async deleteuserslistAdmin(req,res){
    const {users} =await req.body
    if (!users || !Array.isArray(users)) {
      return transform.BadRequest(res,"آیدی  کاربران  ها را به صورت صحیح ارسال کنید ","id's must be sent in array ");
    }
    const result = await userRepositories.deletelistuser(users)
    return transform.successRespond(res,"کاربران ها با موفقیت حذف شد ","users deleted successfully. ")
  }



  
  })
  
  

