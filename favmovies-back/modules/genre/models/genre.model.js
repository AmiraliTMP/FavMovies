const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const types = Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");
const AbstractSchema = require("../../../schema/abstract.schema");

const genreSchema = new AbstractSchema({
  name: {
    type: types.String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: types.String,
    required: false,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "files",
    required: false,
    default: null,
  },
});
genreSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("genre", genreSchema, "genre");
