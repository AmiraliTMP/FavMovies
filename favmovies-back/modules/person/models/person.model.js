const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const types = Schema.Types;

const mongoosePaginate = require("mongoose-paginate-v2");

const AbstractSchema = require("../../../schema/abstract.schema");

// Person roles

const PERSON_ROLES = [
  "actor",
  "director",
  "writer",
  "producer",
  "composer",
  "cinematographer",
  "editor",
];

const personSchema = new AbstractSchema({
  // Basic Information

  name: {
    type: types.String,
    required: true,
    trim: true,
  },

  originalName: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  slug: {
    type: types.String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  imdbId: {
    type: types.String,
    required: false,
    unique: true,
    sparse: true,
    trim: true,
    default: null,
  },

  // Profile

  profileImage: {
    type: Schema.Types.ObjectId,
    ref: "files",
    required: false,
    default: null,
  },

  biography: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  // Personal Information

  birthDate: {
    type: types.Date,
    required: false,
    default: null,
  },

  deathDate: {
    type: types.Date,
    required: false,
    default: null,
  },

  birthPlace: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  nationality: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  // Professional Information

  roles: [
    {
      type: types.String,
      enum: PERSON_ROLES,
      trim: true,
    },
  ],
});

personSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("person", personSchema, "person");

module.exports.PERSON_ROLES = PERSON_ROLES;
