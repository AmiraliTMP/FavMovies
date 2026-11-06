const transforms = require("../../../utilities/apiResponse");
const notificationRepository = require("../repositories/notification.repository");
const userRepository = require("../../user/repositories/user.repositories");
const _ = require("lodash");
const { sendNotification } = require("../../push-notification");

module.exports = new (class notificationService {
  async createNotification(req, res) {
    const data = await req.body;
    const receiver = data.reciever;
    const findreciver = await userRepository.findOne({ _id: receiver.user_id });
    if (!findreciver) {
      return transforms.notFoundRespond(
        res,
        "کاربر یافت نشد",
        "user not found"
      );
    }
    const newNotification = await notificationRepository.create(data);

    return transforms.successRespond(
      res,
      "اعلان با موفقیت ساخته شد",
      "notification created successfully",
      newNotification
    );
  }

  async getDetailNotificationuser(req, res) {
    const { id } = await req.params;
    const { user } = req;

    const findNotification = await notificationRepository.findOne({
      _id: id,
      "reciever.user_id": user._id,
    });

    if (!findNotification) {
      return transforms.notFoundRespond(
        res,
        "اعلان یافت نشد",
        "Notification not found"
      );
    }

    return transforms.successRespond(
      res,
      "اعلان با موفقیت یافت شد",
      "Notification found successfully",
      findNotification
    );
  }

  async getDetailNotificationadmin(req, res) {
    const { id } = await req.params;
    const { admin } = await req;

    const findNotification = await notificationRepository.findOne({
      _id: id,
      "reciever.admin_id": admin._id,
    });

    if (!findNotification) {
      return transforms.notFoundRespond(
        res,
        "اعلان یافت نشد",
        "Notification not found"
      );
    }

    return transforms.successRespond(
      res,
      "اعلان با موفقیت یافت شد",
      "Notification found successfully",
      findNotification
    );
  }

  async getAllNotificationuser(req, res) {
    const page = (await req.query.page) ? req.query.page : 1;
    const limit = (await req.query.limit) ? req.query.limit : 10;
    const { user } = await req;

    const query = { "reciever.user_id": user._id , isDeleted:false };
    const options = {
      page: page,
      limit: limit,
    };
    const notificationsPaginate = await notificationRepository.paginate(
      query,
      options
    );

    return transforms.successRespond(
      res,

      "اعلان ها با موفقیت یافت شدند",
      "Notifications found successfully",
      notificationsPaginate
    );
  }

  async getAllNotificationuserByAdmin(req, res) {
    const page = (await req.query.page) ? req.query.page : 1;
    const limit = (await req.query.limit) ? req.query.limit : 10;
    const { id } = await req.params;
   
    const options = {
      page: page,
      limit: limit,
    };
    const notificationsPaginate = await notificationRepository.paginate(
      query,
      options
    );

    return transforms.successRespond(
      res,
      "اعلان ها با موفقیت یافت شدند",
      "Notifications found successfully",
      notificationsPaginate
    );
  }

  async getAllNotificationAdmin(req, res) {
    const page = (await req.query.page) ? req.query.page : 1;
    const limit = (await req.query.limit) ? req.query.limit : 10;
    const { admin } = await req;
    const { search } = req.query;
    const query = {};
    

    if (search) {
      query.$or = [
          { title: { $regex: new RegExp(search, "i") } },  // Search in title
          { body: { $regex: new RegExp(search, "i") } }    // Search in body
      ];
  }

    const options = {
      page: page,
      limit: limit,
    };
    const notificationsPaginate = await notificationRepository.paginate(
      query,
      options
    );

    return transforms.successRespond(
      res,
      "اعلان ها با موفقیت یافت شدند",
      "Notifications found successfully",
      notificationsPaginate
    );
  }

  async sendNotificationToUsersByAdmin(req, res) {
    const { body, title,  users  } = await req.body;

    const user_type = "USER";
    const user_role = "admin";
    // const condition = { createdAt: { $gte: date } };
    // const finduser = await userRepository.findAll(condition);
    for (let user of users) {
      const finduser= await userRepository.findOne({_id:user})
      const destination_device_token = await finduser.push_token;
      if (destination_device_token) {
        await sendNotification(
          destination_device_token,
          {
            title: title,
            body: body,
          },
          { from: user_role, to: user_type },
          finduser._id
        );
      }
    }
    return transforms.successRespond(res,"اعلان با موفقیت ارسال شذ ","notification successfuly sent")
  }
  async deleteNotificationadmin(req,res){
    const {notifications} =await req.body
     if (!notifications || !Array.isArray(notifications)) {
          return transforms.BadRequest(res,"آیدی  اعلان  ها را به صورت صحیح ارسال کنید ","id's must be sent in array ");
        }
    const result = await notificationRepository.deleteList(notifications)
    return transforms.successRespond(res,"اعلان ها با موفقیت حذف شد ","notifications successfuly deleted")

  }
  async deleteNotificationUser(req,res){
    const {notification_id} = await req.body
    const {user} = await req.params
    const find_notif= await notificationRepository.findOne({_id:notification_id})
    
    if(!find_notif){
      return transforms.notFoundRespond(res,"اعلان پیدا نشد ","notification didnt found")
    }
    const delete_notif = await notificationRepository.deleteByid(notification_id)
    return transforms.successRespond(res,"اعلان با موفقیت حذف شد " ,"notification successfuly deleted")

  }
})();
