const express = require("express");
const router = express.Router();
const AdminController = require('../controller/admin.controller');
const adminVlidation=require('../middleware/adminVlidation')



router.post('/v1/register-admin',[adminVlidation.AuthenticationAdmin,adminVlidation.insertAdminfromPanel],AdminController.InsertAdminbyPanel);
router.post('/v1/login',[adminVlidation.login],AdminController.login);
router.get('/v1/get-admin-profile-by-admin/:adminId',[adminVlidation.AuthenticationAdmin,adminVlidation.IdPrameterValidation],AdminController.findByAdminId);
router.get('/v1/get-user-profile-by-admin/:userId',[adminVlidation.AuthenticationAdmin,adminVlidation.IdPrameterValidationUser],AdminController.findByuserId);
router.put('/v1/edit-admin-profile-by-admin',[adminVlidation.AuthenticationAdmin,adminVlidation.editAdminFromPanel],AdminController.EditAdminByPanel);//patch
router.put('/v1/edit-my-profile',[adminVlidation.AuthenticationAdmin,adminVlidation.editAdminMyProfile],AdminController.EditMyProfile);//patch
router.delete('/v1/delete-my-profile',[adminVlidation.AuthenticationAdmin],AdminController.deleteMyProfile);//delete 
router.delete('/v1/delete-by-admin/:adminId',[adminVlidation.AuthenticationAdmin,adminVlidation.IdPrameterValidation],AdminController.deleteByAdmin);//delete 
router.get('/v1/get-admin-list',[adminVlidation.AuthenticationAdmin],AdminController.findAllAdmin);
router.get('/v1/get-my-profile',[adminVlidation.AuthenticationAdmin],AdminController.findAdminbyToken);




module.exports = router;