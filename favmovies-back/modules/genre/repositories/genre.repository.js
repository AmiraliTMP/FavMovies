const genreModel = require("../models/genre.model");

module.exports = new (class GenreRepository {
  // Create Genre
  async createGenre(genre_detail) {
    return await genreModel.create(genre_detail);
  }

  // Get All Genres with Pagination
  async getAllGenres(page = 1, limit = 10) {
    return await genreModel.paginate(
      {},
      {
        page,
        limit,
        sort: {
          createdAt: -1,
        },
        populate: "image",
      },
    );
  }

  // Get Genre By ID
  async getGenreById(id) {
    return await genreModel.findById(id).populate("image").lean();
  }

  // Update Genre
  async updateGenreById(id, update_detail) {
    if (!update_detail || !Object.keys(update_detail).length) {
      return null;
    }

    return await genreModel.findByIdAndUpdate(
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

  // Delete Genre
  async deleteGenreById(id) {
    return await genreModel.findByIdAndDelete(id);
  }
})();
