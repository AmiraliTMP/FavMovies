const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");
const schema = mongoose.Schema;
const types = schema.Types;
const AbstractSchema = require("../../../schema/abstract.schema");

const filesSchema = new AbstractSchema({
  fieldName: { type: types.String, default: "", required: false },
  originalName: { type: types.String, default: "", required: false },
  encoding: { type: types.String, default: "", required: false },
  mimetype: { type: types.String, default: "", required: false },
  destination: { type: types.String, default: "", required: false },
  fileName: { type: types.String, default: "", required: true, unique: false },
  path: { type: types.String, default: "", required: false },
  size: { type: types.Number, default: "", required: false },
  type: { type: types.String, default: "", required: false },
  public: { type: types.Boolean, default: false, required: false },
  driver: { type: types.ObjectId, ref: "driver", required: false },
  status: { type: types.String, default: "ACCEPTED", required: true },
  isActive: { type: types.Boolean, default: true, required: true },
  isVerified: { type: types.Boolean, default: false, required: true },
});

// filesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("files", filesSchema, "files");
