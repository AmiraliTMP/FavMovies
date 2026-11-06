const express = require("express");
const router = express.Router();
const UserController = require('../controller/user.controller');
const AdminController = require('../../admin/controller/admin.controller');
const userValidation=require('../middleware/userValidation')
const adminValidation=require('../../admin/middleware/adminVlidation')


// router.post('/v1/register-user',[adminValidation.AuthenticationAdmin,userValidation.insertUserfromPanel],UserController.InsertUserbyPanel)
router.post('/v1/send-otp',[userValidation.sendCodeActivition],UserController.sendCodeActivition);
router.post("/v1/submit-otp",[userValidation.submitOtp],UserController.LoginOTP);
// router.put('/v1/change-phone-number',[userValidation.AuthenticationUser,userValidation.changePhoneNumber],UserController.changePhoneNumber)
// router.put('/v1/change-phone-number-by-admin',[adminValidation.AuthenticationAdmin,userValidation.changePhoneNumber],UserController.changePhoneNumber)
// router.put('/v1/Ban-user-by-admin',[adminValidation.AuthenticationAdmin],UserController.banUser)
// router.put('/v1/unBan-user-by-admin',[adminValidation.AuthenticationAdmin],UserController.unBanUser)
// router.get('/v1/get-banned-user-report',[adminValidation.AuthenticationAdmin],UserController.banUserReport)
// router.get('/v1/get-unbanned-user-report',[adminValidation.AuthenticationAdmin],UserController.UnbanUserReport)
// router.get('/v1/get-banned-user-report-by-id/:id',[adminValidation.AuthenticationAdmin],UserController.banUserReportById)

// router.get('/v1/get-user-profile/:userId',[userValidation.AuthenticationUser,userValidation.IdPrameterValidation],UserController.finduserById);
// router.get('/v1/get-my-profile',[userValidation.AuthenticationUser], UserController.getMyprofile);
// router.get('/v1/get-profile/:id',[userValidation.AuthenticationUser], UserController.getUserProfileById);

// router.put('/v1/edit-user-by-admin',[adminValidation.AuthenticationAdmin,userValidation.editUserFromPanel],UserController.EditUserByAdmin)
// router.put('/v1/edit-user-profile',[userValidation.AuthenticationUser,userValidation.editMyProfileUser],UserController.EditMyProfile)

// router.get('/v1/get-usersList-by-admin',[adminValidation.AuthenticationAdmin],UserController.findAllUser);

// router.delete('/v1/delete-user-admin',[adminValidation.AuthenticationAdmin],UserController.deleteUserByAdmin);//delete//userId
// router.delete('/v1/delete-user-list-admin',[adminValidation.AuthenticationAdmin],UserController.deleteuserslistAdmin);//delete//userId
// router.delete('/v1/delete-user-profile',[userValidation.AuthenticationUser],UserController.deleteMyProfile);//deleteuserprofile

// router.get('/v1/check-my-email',[userValidation.AuthenticationUser], UserController.CheckMyEmail)   
// router.post('/v1/create-email-user',[userValidation.AuthenticationUser], UserController.createEmailUser) 
// router.put('/v1/change-role-trader',[userValidation.AuthenticationUser], UserController.updateRoleToTrader) 



  
module.exports = router;