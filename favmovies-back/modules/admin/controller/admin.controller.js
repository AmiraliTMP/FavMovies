const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const transform = require("../../../utilities/apiResponse");
const adminRepository = require("../repositories/admin.repositories");
const userrepo=require("../../user/repositories/user.repositories")
const functions = require("../../../utilities/functions");

module.exports = new (class UserController {
  async InsertAdminbyPanel(req, res) {
    const { userName, mobile  } = req.body;
    let current_admin = await req.admin;
    console.log(current_admin);
    

    

    if (userName) {
      const admin = await adminRepository.findOne({ userName });
      if (admin) {
        return transform.conflict(
          res,
          "نام ادمین تکراری است.",
          "Admin name is duplicate."
        );
      }

      //Check if the provided mobile already exists in the database
      if (mobile) {
        const adminbyMobile = await adminRepository.findOne({ mobile });
        if (adminbyMobile) {
          return transform.conflict(
            res,
            "شماره تلفن وارد شده، از قبل در سامانه وجود دارد.",
            "The entered phone number already exists in the system."
          );
        }
      }

      //hash password
      const salt = bcryptjs.genSaltSync(10);
      const HashPassword = bcryptjs.hashSync(req.body.password, salt);

      // Add the field to the data object if it exists
      var data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        mobile: req.body.mobile,
        password: HashPassword
      };

      const insertAdmin = await adminRepository.create(data);
      if (insertAdmin) {
        return transform.successRespond(
          res,
          "عملیات ایجاد ادمین  با موفقیت انجام شد.",
          "Admin creation was successful.",
          insertAdmin
        );
      }
    }
  }

  async login(req, res) {
    const { userName, password } = req.body;

    //Check if the provided mobile already exists in the database
    let admin = await adminRepository.findOne({ userName });
    if (!admin) {
      return transform.notFoundRespond(
        res,
        "ادمین یافت نشد.",
        "Admin not found."
      );
    }
    // Compare the input password with the user's stored password
    const validatePass = await bcrypt.compare(password, admin.password);
    if (!validatePass) {
      return transform.notFoundRespond(
        res,
        " ادمین یافت نشد.",
        "Admin not found."
      );
    }
    admin = await adminRepository.setAdminLoginAt(admin._id);
    await admin.save();

    let tokens = await functions.createToken(admin);
    if(admin.isDeleted == true){
      return await transform.Forbidden(res,"این اکانت حذف شده است ", 'this account has been deleted')
    }
    return await transform.successRespond(
      res,
      "ادمین با موفقیت وارد شد.",
      "Admin input successfully.",
      { tokens, admin }
    );
  }

  async findByAdminId(req, res) {
    let id = req.params.adminId;

    //Check if a user exists in the database by ID
    const findAdmin = await adminRepository.findbyId(id);
    if (findAdmin) {
      return transform.successRespond(
        res,
        "عملیات یافت ادمین  با موفقیت انجام شد.",
        "Admin creation operation was done successfully.",
        findAdmin
      );
    } else {
      return transform.notFoundRespond(
        res,
        "عملیات یافت ادمین انجام نشد.",
        "Admin creation operation failed."
      );
    }
  }
  async findByuserId(req, res) {
    let id = req.params.userId;

    //Check if a user exists in the database by ID
    const findUser = await userrepo.findUserId(id);
    if (findUser) {
      return transform.successRespond(
        res,
        "عملیات یافت ادمین  با موفقیت انجام شد.",
        "User has been found successfully.",
        findUser
      );
    } else {
      return transform.notFoundRespond(
        res,
        "عملیات یافت ادمین انجام نشد.",
        "User creation operation failed."
      );
    }
  }


  async findAllAdmin(req, res) {
    const limit = (await req.query.limit) ? req.query.limit : 40;
    const page = (await req.query.page) ? req.query.page : 1;
    const $and = [{}];
    const search = (await req.query.search) ? req.query.search : null;
    const pagination = req.query.pagination === "true"; 
    const query = {isDeleted:false};
    let admin_list = null
     if (search) {
      query.$or = [
          { userName: { $regex: new RegExp(search, "i") } }    
      ];
  }

    if(pagination){
      const options = {
        page: page,
        limit: limit,
      };
       admin_list = await adminRepository.paginate(query, options);
    }
    else{
      admin_list = await adminRepository.findAll({isDeleted:false});
    }


    return transform.successRespond(
      res,
      "لیست ادمین ها با موفقیت یافت شدند.",
      "The list of admins was successfully found.",
      admin_list
    );
  }

  async EditAdminByPanel(req, res) {
    const { userName, mobile, password, firstName, lastName ,} = await req.body;
    let id = req.body.adminId;
    let admin = await req.admin;
    let current_admin = await adminRepository.findbyId(id);
    if (!current_admin) {
      return transform.notFoundRespond(
        res,
        "ادمین پیدا نشد",
        "the admin not found"
      );
    }
    if (userName) {
      const findAdminUserName = await adminRepository.findOne({
        userName: req.body.userName,
        _id: { $ne: id },
      });
      if (findAdminUserName) {
        return transform.conflict(
          res,
          "نام کاربری تکراری است.",
          "username is duplicated."
        );
      }
      current_admin.userName = userName;
    }

    if (mobile) {
      const findmobileAdmin = await adminRepository.findOne({
        mobile: req.body.mobile,
        _id: { $ne: id },
      });
      if (findmobileAdmin) {
        return transform.conflict(
          res,
          "شماره تلفن وارد شده، از قبل در سامانه وجود دارد.",
          "The entered phone number already exists in the system."
        );
      }
      current_admin.mobile = mobile;
    }

    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      const HashPassword = bcryptjs.hashSync(password, salt);
      current_admin.password = HashPassword;
    }

    if (firstName) {
      current_admin.firstName = firstName;
    }

    if (lastName) {
      current_admin.lastName = lastName;
    }

    await current_admin.save();

    return transform.successRespond(
      res,
      "عملیات ویرایش  با موفقیت انجام شد.",
      "The editing operation was completed successfully.",
      current_admin
    );
  }

  async EditMyProfile(req, res) {
    const { userName, mobile, password, firstName, lastName } = await req.body;
    let current_admin = req.admin;

    if (userName) {
      let findAdmin = await adminRepository.findOne({
        userName,
        _id: { $ne: current_admin._id },
      });
      if (findAdmin) {
        return transform.conflict(
          res,
          "نام ادمین تکراری است.",
          "Admin name is duplicate."
        );
      }
      current_admin.userName=await userName
    }

    if (mobile) {
      let findmobileAdmin = await adminRepository.findOne({
        mobile,
        _id: { $ne: current_admin._id },
      });
      if (findmobileAdmin) {
        return transform.conflict(
          res,
          "شماره تلفن وارد شده، از قبل در سامانه وجود دارد.",
          "The entered phone number already exists in the system."
        );
      }
      current_admin.mobile=await mobile
    }
    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      const HashPassword = bcryptjs.hashSync(password, salt);
      current_admin.password = HashPassword;
    }

    if (firstName) {
      current_admin.firstName = firstName;
    }

    if (lastName) {
      current_admin.lastName = lastName;
    }

    await current_admin.save();
    return transform.successRespond(
      res,
      "عملیات ویرایش  با موفقیت انجام شد.",
      "The editing operation was completed successfully.",
      current_admin
    );
  }

  async findAdminbyToken(req, res) {
    let { admin } = req;

    return transform.successRespond(
      res,
      " پروفایل ادمین با موفقیت یافت شد.",
      "Admin profile found successfully.",
      admin
    );
  }

  async deleteMyProfile(req, res) {
    let {admin} = req;

    //soft delete
    admin.isDeleted = await true;
    const now = await new Date();
    admin.deletedDate = await now;
    await admin.save();

    return transform.successRespond(
      res,
      "ادمین با موفقیت حذف شد",
      "admin deleted successfully"
    );
  }


async deleteByAdmin(req,res){
  const id=req.params.adminId;
  const findAdmin=await adminRepository.findbyId(id);

  if(!findAdmin){
    return transform.notFoundRespond(
      res,
      "ادمین یافت نشد",
      "admin not found"
    )
  }

  //soft delete
  findAdmin.isDeleted = await true;
  const now = await new Date();
  findAdmin.deletedDate = await now;
  await findAdmin.save();

  return transform.successRespond(
    res,
    "ادمین با موفقیت حذف شد",
    "admin deleted successfully"
  )
}
})
();
