const movieModel = require("../models/movies.model");

module.exports = new (class MovieRepository {
  // Create Movie
  async createMovie(movie_detail) {
    return await movieModel.create(movie_detail);
  }

  // Get All Movies with Pagination
  async getAllMovies(page = 1, limit = 10) {
    return await movieModel.paginate(
      {},

      {
        page,

        limit,

        sort: {
          createdAt: -1,
        },

        populate: [
          {
            path: "poster",
          },

          {
            path: "backdrop",
          },

          {
            path: "genres",
          },

          //   {
          //     path: "director",
          //   },

          //   {
          //     path: "writers",
          //   },

          //   {
          //     path: "actors",
          //   },
        ],
      },
    );
  }

  // Get Movie By ID
  async getMovieById(id) {
    return await movieModel
      .findById(id)

      .populate("poster")

      .populate("backdrop")

      .populate("genres")

      //   .populate("director")

      //   .populate("writers")

      //   .populate("actors")

      .lean();
  }

  // Update Movie
  async updateMovieById(id, update_detail) {
    if (!update_detail || !Object.keys(update_detail).length) {
      return null;
    }

    return await movieModel.findByIdAndUpdate(
      id,

      {
        $set: update_detail,
      },

      {
        new: true,

        runValidators: true,
      },
    );
  }

  // Delete Movie
  async deleteMovieById(id) {
    return await movieModel.findByIdAndDelete(id);
  }
})();
