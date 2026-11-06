const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification.controller");
const notificationMiddleware = require("../middleware/notification.middleware");
const userValidationMiddleware=require("../../user/middleware/userValidation")
const adminValidation=require('../../admin/middleware/adminVlidation');

module.exports = router;

router.post("/v1/send-notification", [adminValidation.AuthenticationAdmin, notificationMiddleware.sendNotification], NotificationController.sendNotification);
router.post("/v1/send-notification-to-users", [adminValidation.AuthenticationAdmin], NotificationController.sendNotificationToUsersByAdmin);
router.get("/v1/get-detail-notification-user/:id",[userValidationMiddleware.AuthenticationUser,notificationMiddleware.IdPrameterValidation],NotificationController.getDetailNotificationuser);
router.get("/v1/get-notification-list-user",[userValidationMiddleware.AuthenticationUser],NotificationController.getAllNotificationsuser);
router.get("/v1/get-notification-list-user-by-admin/:id",[adminValidation.AuthenticationAdmin,notificationMiddleware.IdPrameterValidation],NotificationController.getAllNotificationuserByAdmin);
router.get("/v1/get-detail-notification-admin/:id",[adminValidation.AuthenticationAdmin,notificationMiddleware.IdPrameterValidation],NotificationController.getDetailNotificationadmin);
router.get("/v1/get-notification-list-admin",[adminValidation.AuthenticationAdmin],NotificationController.getAllNotificationsadmin);
router.delete("/v1/delete-notification-admin",[adminValidation.AuthenticationAdmin],NotificationController.deleteNotifications);
router.delete("/v1/delete-notification-user",[userValidationMiddleware.AuthenticationUser,notificationMiddleware.deletenotifuser],NotificationController.deleteNotificationUser);