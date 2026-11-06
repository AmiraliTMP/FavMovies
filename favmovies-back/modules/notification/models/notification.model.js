const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const types = Schema.Types;
const mongoosePaginate = require('mongoose-paginate-v2');
const AbstractSchema = require("../../../schema/abstract.schema");

const notificationSchema = new AbstractSchema({
  title: { type: types.String, required: true },
  body: { type: types.String, required: true },
  reciever:{
    type: {
      user_id: { type: types.ObjectId, ref: "user", required: false },
      admin_id: { type: types.ObjectId, ref: "admin", required: false },
    },
    required: true,
  },

});

notificationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model(
  "notification",
  notificationSchema,
  "notification"
);
