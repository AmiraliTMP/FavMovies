const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const types = Schema.Types;

const mongoosePaginate = require("mongoose-paginate-v2");

const AbstractSchema = require("../../../schema/abstract.schema");

const movieSchema = new AbstractSchema({
  // Basic Information
  title: {
    type: types.String,
    required: true,
    trim: true,
  },

  originalTitle: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  tagline: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  imdbId: {
    type: types.String,
    required: false,
    unique: true,
    sparse: true,
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

  description: {
    type: types.String,
    required: false,
    trim: true,
    default: null,
  },

  // Media
  poster: {
    type: Schema.Types.ObjectId,
    ref: "files",
    required: false,
    default: null,
  },

  backdrop: {
    type: Schema.Types.ObjectId,
    ref: "files",
    required: false,
    default: null,
  },

  // An IMDb-style website, a trailer will most commonly be an external YouTube/Vimeo video.
  trailer: {
    type: types.String,
    required: false,
    default: null,
    trim: true,
  },

  // Release Information
  releaseDate: {
    type: types.Date,
    required: false,
    default: null,
  },

  // Movie Details
  duration: {
    type: types.Number,
    required: false,
    min: 1,
    default: null,
  },

  ageRating: {
    type: types.String,
    required: false,
    default: null,
    trim: true,
  },

  // Ratings
  rating: {
    type: types.Number,
    default: 0,
    min: 0,
    max: 10,
  },

  voteCount: {
    type: types.Number,
    default: 0,
    min: 0,
  },

  // Relationships
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "genre",
    },
  ],

  director: {
    type: Schema.Types.ObjectId,
    ref: "person",
    required: false,
    default: null,
  },

  writers: [
    {
      type: Schema.Types.ObjectId,
      ref: "person",
    },
  ],

  actors: [
    {
      type: Schema.Types.ObjectId,
      ref: "person",
    },
  ],

  // Production
  countries: [
    {
      type: types.String,
      trim: true,
    },
  ],

  languages: [
    {
      type: types.String,
      trim: true,
    },
  ],

  // Production Information
  budget: {
    type: types.Number,
    required: false,
    default: null,
    min: 0,
  },

  revenue: {
    type: types.Number,
    required: false,
    default: null,
    min: 0,
  },

  // Status
  status: {
    type: types.String,
    enum: ["upcoming", "released"],
    default: "released",
  },
});

movieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("movie", movieSchema, "movie");
