const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
// const userValidation=require('../../user/middleware/userValidation')
// const{ AuthenticationAdmin} =require("../../admin/middleware/adminVlidation")
const { UploadFile } = require("../middleware/file.middleware");
const transforms = require("../../../utilities/apiResponse");

const fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    return transforms.ContentTooLarge(
      res,
      "حجم فایل آپلودی نباید بیشتر از 1 مگابایت باشد",
      "The size of the uploaded file should not exceed 1 MB",
    );
  } else {
    next();
  }
};

router.post(
  "/v1/upload",
  UploadFile.single("file"),
  fileSizeLimitErrorHandler,
  fileController.upload.bind(fileController),
);
router.post(
  "/v1/upload-admin",
  UploadFile.single("file"),
  fileSizeLimitErrorHandler,
  fileController.upload.bind(fileController),
);
// router.get('/:filename', fileController.getFile.bind(fileController));
// router.post('/v1/upload', UploadFile.single("file"), fileSizeLimitErrorHandler, fileController.upload.bind(fileController));
// router.post('/upload', isAdmin, UploadFile.single("file"), fileSizeLimitErrorHandler, fileController.upload.bind(fileController));
// router.get('/v1/details/:id',fileController.details.bind(fileController));
// router.patch('/v1/delete/:id',fileController.delete.bind(fileController));
// router.get('/v1/search',fileController.search.bind(fileController));

module.exports = router;
