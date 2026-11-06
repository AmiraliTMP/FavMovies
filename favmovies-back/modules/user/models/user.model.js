var mongoose = require('mongoose');
const abstractSchema = require("../../../schema/abstract.schema");

const mongoosePaginate = require("mongoose-paginate-v2");
const { Types } = require('mongoose/lib/schema');
const { String, Number } = require('mongoose/lib/schema/index');
var Schema = mongoose.Schema;

const types = Schema.Types;

var UserModelSchema = new abstractSchema({
  userName:{ type: String,required: false},
  mobile: { type: String ,required: true},
  email: { type: String,required: false },  
  role:{type:String,required:true , default:"driver"},
  imageId: {type: Schema.Types.ObjectId, ref: 'files',required: false},
  push_token: [
    {
      device_id: { type: types.String, required: true },
      push_token: { type: types.String, required: true },
    },
  ],

});

UserModelSchema.plugin(mongoosePaginate);
module.exports=mongoose.model('user', UserModelSchema);