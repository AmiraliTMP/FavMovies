const notificationService = require("../services/notification.service");

module.exports = new (class notificationController {
  async sendNotification(req, res) {
    return await notificationService.createNotification(req, res);
  }


  async getDetailNotificationuser(req, res) {
    return await notificationService.getDetailNotificationuser(req, res);
  }

  async getDetailNotificationadmin(req, res) {
    return await notificationService.getDetailNotificationadmin(req, res);
  }

  async getAllNotificationsuser(req, res) {
    return await notificationService.getAllNotificationuser(req, res);
  }

  async getAllNotificationuserByAdmin(req, res) {
    return await notificationService.getAllNotificationuserByAdmin(req, res);
  }

  async sendNotificationToUsersByAdmin(req, res) {
    return await notificationService.sendNotificationToUsersByAdmin(req, res);
  }

  async getAllNotificationsadmin(req, res) {
    return await notificationService.getAllNotificationAdmin(req, res);
  }
  async deleteNotifications(req,res){
    return await notificationService.deleteNotificationadmin(req,res);
  }
  async deleteNotificationUser(req,res){
    return await notificationService.deleteNotificationUser(req,res);
  }
  
})();
