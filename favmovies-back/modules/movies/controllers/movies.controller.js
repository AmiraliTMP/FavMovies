const movieRepositories = require("../repositories/movies.repositories");
const transforms = require("../../../utilities/apiResponse");

module.exports = new (class MovieController {
  // POST /add-movie
  async createMovie(req, res) {
    try {
      const movieData = {
        title: req.body.title,
        originalTitle: req.body.originalTitle || null,
        slug: req.body.slug,
        description: req.body.description || null,

        poster: req.body.poster || null,
        backdrop: req.body.backdrop || null,
        trailer: req.body.trailer || null,

        releaseDate: req.body.releaseDate || null,

        duration: req.body.duration || null,
        ageRating: req.body.ageRating || null,

        genres: req.body.genres || [],
        director: req.body.director || null,
        writers: req.body.writers || [],
        actors: req.body.actors || [],

        countries: req.body.countries || [],
        languages: req.body.languages || [],

        budget: req.body.budget || null,
        revenue: req.body.revenue || null,

        status: req.body.status || "released",
      };

      const result = await movieRepositories.createMovie(movieData);

      return transforms.successRespond(
        res,
        "Le film a été créé avec succès",
        "movie created successfully",
        result,
      );
    } catch (error) {
      if (error.code === 11000) {
        return transforms.BadRequest(
          res,
          "Le film existe déjà",
          "movie already exists",
          "slug",
        );
      }

      return transforms.errorserver(res, error.message, "create movie failed");
    }
  }

  // GET /get-all-movies
  async getAllMovies(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const result = await movieRepositories.getAllMovies(page, limit);

      return transforms.successRespond(
        res,
        "Les films ont été trouvés avec succès",
        "movies found successfully",
        result,
      );
    } catch (error) {
      return transforms.errorserver(res, error.message, "get movies failed");
    }
  }

  // GET /get-movie-details/:id
  async getMovieById(req, res) {
    try {
      const result = await movieRepositories.getMovieById(req.params.id);

      if (!result) {
        return transforms.BadRequest(
          res,
          "Le film n'existe pas",
          "movie not found",
          "id",
        );
      }

      return transforms.successRespond(
        res,
        "Les détails du film ont été trouvés avec succès",
        "movie details found successfully",
        result,
      );
    } catch (error) {
      return transforms.errorserver(
        res,
        error.message,
        "get movie details failed",
      );
    }
  }

  // PATCH /edit-movie/:id
  async updateMovie(req, res) {
    try {
      const updateData = {
        ...req.body,
      };

      const result = await movieRepositories.updateMovieById(
        req.params.id,
        updateData,
      );

      if (!result) {
        return transforms.BadRequest(
          res,
          "Le film n'existe pas",
          "movie not found",
          "id",
        );
      }

      return transforms.successRespond(
        res,
        "Le film a été modifié avec succès",
        "movie updated successfully",
        result,
      );
    } catch (error) {
      if (error.code === 11000) {
        return transforms.BadRequest(
          res,
          "Le film existe déjà",
          "movie already exists",
          "slug",
        );
      }

      return transforms.errorserver(res, error.message, "update movie failed");
    }
  }

  // DELETE /delete-movie/:id
  async deleteMovie(req, res) {
    try {
      const result = await movieRepositories.deleteMovieById(req.params.id);

      if (!result) {
        return transforms.BadRequest(
          res,
          "Le film n'existe pas",
          "movie not found",
          "id",
        );
      }

      return transforms.successRespond(
        res,
        "Le film a été supprimé avec succès",
        "movie deleted successfully",
        result,
      );
    } catch (error) {
      return transforms.errorserver(res, error.message, "delete movie failed");
    }
  }
})();
