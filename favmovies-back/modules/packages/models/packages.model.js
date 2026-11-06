const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const types = Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");
const AbstractSchema = require("../../../schema/abstract.schema");

const PackageSchema = new AbstractSchema({
    name: { type: types.String, required: true },
    price: { type: types.Number, required: true },
    days: { type: types.Number, required: true },
    description: { type: types.String, required: true },
    });

PackageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("packages", PackageSchema, "packages");