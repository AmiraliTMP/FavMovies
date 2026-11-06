const mongoose = require("mongoose");

function abstractSchema(options) {
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

  // schema.pre(/.*/, function() {
  //     this.findOne({isDeleted: false});
  // })

  schema.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
    next();
  });
  //
  schema.pre(/^update/, function (next) {
    this.where({ isDeleted: false });

    next();
  });

  return schema;
}

module.exports = abstractSchema;