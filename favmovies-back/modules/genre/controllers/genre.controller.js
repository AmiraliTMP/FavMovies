const genreRepositories = require("../repositories/genre.repository");
const transforms = require("../../../utilities/apiResponse");

module.exports = new (class GenreController {
  // POST /add-genre
  async createGenre(req, res) {
    try {
      const genreData = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image || null,
      };

      const result = await genreRepositories.createGenre(genreData);

      return transforms.successRespond(
        res,
        "Le genre a été créé avec succès",
        "genre created successfully",
        result,
      );
    } catch (error) {
      if (error.code === 11000) {
        return transforms.BadRequest(
          res,
          "Le genre existe déjà",
          "genre already exists",
          "name",
        );
      }

      return transforms.errorserver(res, error.message, "create genre failed");
    }
  }

  // GET /get-all-genres
  async getAllGenres(req, res) {
    try {
      const page = Number(req.query.page) || 1;

      const limit = Number(req.query.limit) || 10;

      const result = await genreRepositories.getAllGenres(page, limit);

      return transforms.successRespond(
        res,
        "Les genres ont été trouvés avec succès",
        "genres found successfully",
        result,
      );
    } catch (error) {
      return transforms.errorserver(res, error.message, "get genres failed");
    }
  }

  // GET /get-genre-details/:id
  async getGenreById(req, res) {
    try {
      const result = await genreRepositories.getGenreById(req.params.id);

      if (!result) {
        return transforms.BadRequest(
          res,
          "Le genre n'existe pas",
          "genre not found",
          "id",
        );
      }

      return transforms.successRespond(
        res,
        "Les détails du genre ont été trouvés avec succès",
        "genre details found successfully",
        result,
      );
    } catch (error) {
      return transforms.errorserver(
        res,
        error.message,
        "get genre details failed",
      );
    }
  }

  // PATCH /edit-genre/:id
  async updateGenre(req, res) {
    try {
      const updateData = {
        ...req.body,
      };

      const result = await genreRepositories.updateGenreById(
        req.params.id,
        updateData,
      );

      if (!result) {
        return transforms.BadRequest(
          res,
          "Le genre n'existe pas",
          "genre not found",
          "id",
        );
      }

      return transforms.successRespond(
        res,
        "Le genre a été modifié avec succès",
        "genre updated successfully",
        result,
      );
    } catch (error) {
      if (error.code === 11000) {
        return transforms.BadRequest(
          res,
          "Le genre existe déjà",
          "genre already exists",
          "name",
        );
      }

      return transforms.errorserver(res, error.message, "update genre failed");
    }
  }

  // DELETE /delete-genre/:id
  async deleteGenre(req, res) {
    try {
      const result = await genreRepositories.deleteGenreById(req.params.id);

      if (!result) {
        return transforms.BadRequest(
          res,
          "Le genre n'existe pas",
          "genre not found",
          "id",
        );
      }

      return transforms.successRespond(
        res,
        "Le genre a été supprimé avec succès",
        "genre deleted successfully",
        result,
      );
    } catch (error) {
      return transforms.errorserver(res, error.message, "delete genre failed");
    }
  }
})();
