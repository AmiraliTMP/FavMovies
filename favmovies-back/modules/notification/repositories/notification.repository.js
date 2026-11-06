const notificationModel = require("../models/notification.model");

module.exports = new class notificationRepository {
  async create(data) {
    return await notificationModel.create(data);
  }

  async findOne(condition) {
    return await notificationModel.findOne(condition);
  }

  async findAll(condition) {
    return await notificationModel.find(condition);
  }
  async findById(condition) {
    return await notificationModel.findById(condition);
  }

  async paginate(query, options) {
    return await notificationModel.paginate( {...query} , {...options, sort: { createdAt: -1 } , 
      populate: {
        path: "reciever",
        populate: {
          path: "user_id",
          select: "_id userName mobile",
          model: "user"
        }
      }
    } 
      
    );
  }
  async deleteByid(id){
    return await notificationModel.updateOne({_id:id},{$set:{isDeleted:true}})
  }
  async deleteList(condition){
    return await notificationModel.updateMany({_id:{$in:condition} },{ $set: { isDeleted: true }})

  }
}();
