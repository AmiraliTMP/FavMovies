const express = require("express");
const router = express.Router();
const PackageController = require('../controller/package.controller');
const packageValidation=require('../middleware/packages.middelware')
const adminValidation=require('../../admin/middleware/adminVlidation')
const userValidation=require('../../user/middleware/userValidation');
const packageController = require("../controller/package.controller");



//admin
router.post('/v1/create-package',[adminValidation.AuthenticationAdmin,packageValidation.insetPackage],PackageController.insertPackage)
router.put('/v1/update-package',[adminValidation.AuthenticationAdmin,packageValidation.updatePackage],PackageController.updatePackage)
// router.put("/v1/add-more-time-package" ,[adminValidation.AuthenticationAdmin],packageController.addMoreTime)
router.get('/v1/get-all-packages',[adminValidation.AuthenticationAdmin],PackageController.getAllPackages)
router.get('/v1/get-package-by-id/:id',[adminValidation.AuthenticationAdmin,packageValidation.getPackageById],PackageController.getPackageById)
router.delete('/v1/delete-package',[adminValidation.AuthenticationAdmin,packageValidation.deletePackage],PackageController.deletePackage)
router.delete('/v1/delete-package-selected',[adminValidation.AuthenticationAdmin],PackageController.deletePackageSelected)

//user
router.get('/v1/get-all-packages-user',[userValidation.AuthenticationUser],PackageController.getAllpackageUser)

module.exports = router;