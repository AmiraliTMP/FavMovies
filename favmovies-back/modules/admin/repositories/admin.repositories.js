const AdminModel = require("../models/admin.model");

module.exports = new (class adminRepository {
  async create(data) {
    return await AdminModel.create(data);
  }

  async setAdminLoginAt(userId) {
    return await AdminModel.findByIdAndUpdate(userId, { new: true });
  }

  async findbyId(adminId) {
    return await AdminModel.findById(adminId).select("-__v -password");
  }

  async findOne(condition) {
    return await AdminModel.findOne(condition);
  }

  async findAll(condition) {
    return await AdminModel.find(condition).select("-__v -password");
  }
  async paginate(query, options) {
    return await AdminModel.paginate(query, {
      ...options,
      select: "-__v -password",
    });
  }
})();
