const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const types = Schema.Types;
const AbstractSchema = require("../../../schema/abstract.schema");
const ticketMessagesSchema = new AbstractSchema({
  ticket_id: { type: types.ObjectId, ref: "ticket", required: true },
  description: { type: String, required: false },
  sender: {
    type: {
      user_id: { type: types.ObjectId, ref: "user", required: false },
      admin_id: { type: types.ObjectId, ref: "admin", required: false },
    },
    required: true,
  },
});
module.exports = mongoose.model(
  "ticket-messages",
  ticketMessagesSchema,
  "ticket-messages"
);
