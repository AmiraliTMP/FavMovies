var mongoose = require('mongoose');
const abstractAdminAndUserSchema = require("../../../schema/abstract.schema.adminanduser");
const mongoosePaginate = require('mongoose-paginate-v2');
// var Schema = mongoose.Schema;

var AdminModelSchema = new abstractAdminAndUserSchema({
  firstName: { type: String, minlength: 2, required: false },
  lastName: { type: String, minlength: 2, required: false },
  userName:{ type: String, unique: true ,required: true},
  password: { type: String, minlength: 6 ,required: false},
  email: { type: String,required: false,default:'' },
});

AdminModelSchema.plugin(mongoosePaginate);
module.exports=mongoose.model('admin', AdminModelSchema);