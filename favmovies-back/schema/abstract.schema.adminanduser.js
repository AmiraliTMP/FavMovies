const mongoose = require("mongoose");

function abstractAdminAndUserSchema(options) {
  const schema = new mongoose.Schema(
    {
      ...options,
      isDeleted: { type: Boolean, default: false },
      deletedDate: { type: Date, required: false },
    },
    {
      timestamps: true,
    }
  );
  return schema;
}

module.exports = abstractAdminAndUserSchema;
