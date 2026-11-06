const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const types = Schema.Types;
const AbstractSchema = require("../../../schema/abstract.schema");
const mongoosePaginate = require("mongoose-paginate-v2");
const ticketSchema = new AbstractSchema({
  subject: { type: String, required: true },
  creator: {
    type: {
      user_id: { type: types.ObjectId, ref: "user", required: false },
      admin_id: { type: types.ObjectId, ref: "operator", required: false },
    },
    required: true,
  }
});
ticketSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ticket", ticketSchema, "ticket");
