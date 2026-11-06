const express = require("express");
const router = express.Router();
const transforms = require("../../utilities/apiResponse");
const Validators = require("../../utilities/Validator");
const {AuthenticationUser} = require("../user/middleware/userValidation")
const {AuthenticationAdmin} = require("../admin/middleware/adminVlidation")
const userRepository = require("../user/repositories/user.repositories");
const adminRepository = require("../admin/repositories/admin.repositories");
const { find } = require("lodash");

async function midd(req, res, next) {
  const { push_token } = req.body;
  if (!push_token || typeof push_token != "string") {
    return transforms.BadRequest(res, "توکن فایربیس وارد شده معتبر نیست !","the entered firebase token is not valid !", "push_token");
  }
  next();
}
router.post("/v1/save-push-token-user",AuthenticationUser ,  midd, async (req, res) => {
  const { push_token , device_id } = req.body;

  let findUser = await userRepository.findUserId(req.user._id);
  if (!findUser) {
    return transforms.notFoundRespond(res, "هیچ کاربری پیدا نشد !","no user found !");
  }
  if(!findUser.push_token){
    findUser.push_token = [{device_id, push_token}]
  } else{
    await findUser.push_token.push({device_id, push_token});
  }
  findUser = await findUser.save();
  return transforms.successRespond(res, findUser, "توکن مربوطه با موفقیت ست شد !","the relevant token was successfully set !");
});

router.post("/v1/save-push-token-admin",AuthenticationAdmin, midd, async (req, res) => {
  const { push_token } = req.body;
  let find_admin = await adminRepository.findById(req.admin._id);
  if (!find_admin) {
    return transforms.notFoundRespond(res, "هیچ کاربری پیدا نشد !","no user found !");
  }
  if(!find_admin.push_token){
    find_admin.push_token = [{device_id, push_token}]
  } else{
    await find_admin.push_token.push({device_id, push_token});
  }
  find_admin = await find_admin.save();
  return transforms.successRespond(
    res,
    find_admin,
    "توکن مربوطه با موفقیت ست شد !",
    "the relevant token was successfully set !"

  );
});
module.exports = router;
