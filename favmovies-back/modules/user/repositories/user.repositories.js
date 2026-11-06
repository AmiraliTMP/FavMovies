const userModel = require("../models/user.model");
const UserModel = require("../models/user.model");

module.exports = new (class userService {
  async create(data) {
    return await UserModel.create(data);
  }


  async findOne(condition) {
    return await UserModel.findOne(condition).populate({
      path: "imageId"
    });
  }

  async findUserId(userId) {
    console.log("Searching for user ID:", userId);
    return await UserModel.findById(userId).populate([
      { path: "imageId", select: "_id path name" },
      {path : "package",select :"_id path name" }
    ]);
  }
async findAll(condition) {
  return await UserModel.find(condition)
    .where({ isDeleted: false })
    .select("-__v -password")
    .sort({ createdAt: -1 })
    .populate([
      { path: "banInfo", select: "_id type expiresAt" },
      { path: "imageId", select: "_id path name" }
    ]);
}
  async paginate(query, options) {
    return await UserModel.paginate(query, {
      ...options,
      sort: { createdAt: -1 },
      select: "-__v -password", 
      where: { isDeleted: false }, 
    });
  }

  async deletelistuser(condition) {
    return await userModel.updateMany(
      { _id: { $in: condition } },
      { $set: { isDeleted: true } }

    );
  }





 
})();
