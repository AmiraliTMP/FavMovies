const mongoose = require("mongoose");
const transforms = require("../../../utilities/apiResponse");

module.exports = new (class GenreMiddleware {
  // Validate MongoDB ObjectId
  _validateObjectId(id, res, field = "id") {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      transforms.BadRequest(
        res,
        `L'identifiant ${field} n'est pas valide`,
        `Invalid ${field}`,
        field,
      );

      return false;
    }

    return true;
  }

  // Validate data when creating genre
  _validateGenreData(req, res, { requireSlug = true } = {}) {
    const { name, slug, image } = req.body;

    // Name validation
    if (!name || typeof name !== "string" || !name.trim()) {
      transforms.BadRequest(
        res,
        "Le nom du genre n'est pas valide",
        "genre name has problem",
        "name",
      );

      return false;
    }

    req.body.name = name.trim();

    // Slug validation
    if (requireSlug) {
      if (!slug || typeof slug !== "string" || !slug.trim()) {
        transforms.BadRequest(
          res,
          "Le slug du genre n'est pas valide",
          "genre slug has problem",
          "slug",
        );

        return false;
      }

      req.body.slug = slug.trim().toLowerCase();
    } else if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        transforms.BadRequest(
          res,
          "Le slug du genre n'est pas valide",
          "genre slug has problem",
          "slug",
        );

        return false;
      }

      req.body.slug = slug.trim().toLowerCase();
    }

    // Image validation
    if (image !== undefined && image !== null) {
      if (!this._validateObjectId(image, res, "image")) {
        return false;
      }
    }

    return true;
  }

  // Validate PATCH update data
  _validateGenreUpdate(req, res) {
    const { name, slug, image } = req.body;

    // Name optional
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        transforms.BadRequest(
          res,
          "Le nom du genre n'est pas valide",
          "genre name has problem",
          "name",
        );

        return false;
      }

      req.body.name = name.trim();
    }

    // Slug optional
    if (slug !== undefined) {
      if (typeof slug !== "string" || !slug.trim()) {
        transforms.BadRequest(
          res,
          "Le slug du genre n'est pas valide",
          "genre slug has problem",
          "slug",
        );

        return false;
      }

      req.body.slug = slug.trim().toLowerCase();
    }

    // Image optional
    if (image !== undefined && image !== null) {
      if (!this._validateObjectId(image, res, "image")) {
        return false;
      }
    }

    return true;
  }

  // POST /add-genre
  addGenre(req, res, next) {
    if (
      this._validateGenreData(req, res, {
        requireSlug: true,
      }) !== true
    ) {
      return;
    }

    next();
  }

  // GET /get-all-genres
  getAllGenres(req, res, next) {
    if (req.query.page !== undefined) {
      const page = parseInt(req.query.page, 10);

      if (isNaN(page) || page < 1) {
        return transforms.BadRequest(
          res,
          "Le numéro de page n'est pas valide",
          "Invalid page number",
          "page",
        );
      }

      req.query.page = page;
    }

    if (req.query.limit !== undefined) {
      const limit = parseInt(req.query.limit, 10);

      if (isNaN(limit) || limit < 1 || limit > 100) {
        return transforms.BadRequest(
          res,
          "La limite n'est pas valide (1-100)",
          "Invalid limit (must be between 1 and 100)",
          "limit",
        );
      }

      req.query.limit = limit;
    }

    next();
  }

  // GET /get-genre-details/:id
  getGenreDetails(req, res, next) {
    if (this._validateObjectId(req.params.id, res) !== true) {
      return;
    }

    next();
  }

  // PATCH /edit-genre/:id
  editGenre(req, res, next) {
    if (this._validateObjectId(req.params.id, res) !== true) {
      return;
    }

    if (this._validateGenreUpdate(req, res) !== true) {
      return;
    }

    next();
  }

  // DELETE /delete-genre/:id
  deleteGenre(req, res, next) {
    if (this._validateObjectId(req.params.id, res) !== true) {
      return;
    }

    next();
  }
})();
