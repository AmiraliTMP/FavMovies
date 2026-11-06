const mongoose = require("mongoose");
const validator = require("../../../utilities/Validator");
const transforms = require("../../../utilities/apiResponse");

module.exports = new (class MovieMiddleware {
  // POST /add-movie
  addMovie(req, res, next) {
    const {
      title,
      originalTitle,
      slug,
      description,
      poster,
      backdrop,
      trailer,
      releaseDate,
      duration,
      ageRating,
      rating,
      voteCount,
      genres,
      director,
      writers,
      actors,
      countries,
      languages,
      budget,
      revenue,
      status,
    } = req.body;

    // Title
    if (!validator.IsDefined(title).Success) {
      return transforms.BadRequest(
        res,
        "Le titre du film est requis",
        "Movie title is required",
        "title",
      );
    }

    if (!validator.IsString(title).Success) {
      return transforms.BadRequest(
        res,
        "Le titre du film doit être une chaîne de caractères",
        "Movie title must be a string",
        "title",
      );
    }

    if (!validator.Trim(title).Success) {
      return transforms.BadRequest(
        res,
        "Le titre du film ne peut pas être vide",
        "Movie title cannot be empty",
        "title",
      );
    }

    req.body.title = title.trim();

    // Original Title
    if (originalTitle !== undefined && originalTitle !== null) {
      if (!validator.IsString(originalTitle).Success) {
        return transforms.BadRequest(
          res,
          "Le titre original doit être une chaîne de caractères",
          "Original title must be a string",
          "originalTitle",
        );
      }

      req.body.originalTitle = originalTitle.trim();
    }

    // Slug
    if (!validator.IsDefined(slug).Success) {
      return transforms.BadRequest(
        res,
        "Le slug du film est requis",
        "Movie slug is required",
        "slug",
      );
    }

    if (!validator.IsString(slug).Success) {
      return transforms.BadRequest(
        res,
        "Le slug du film doit être une chaîne de caractères",
        "Movie slug must be a string",
        "slug",
      );
    }

    if (!validator.Trim(slug).Success) {
      return transforms.BadRequest(
        res,
        "Le slug du film ne peut pas être vide",
        "Movie slug cannot be empty",
        "slug",
      );
    }

    req.body.slug = slug.trim().toLowerCase();

    // Description
    if (description !== undefined && description !== null) {
      if (!validator.IsString(description).Success) {
        return transforms.BadRequest(
          res,
          "La description doit être une chaîne de caractères",
          "Description must be a string",
          "description",
        );
      }

      req.body.description = description.trim();
    }

    // Poster
    if (poster !== undefined && poster !== null) {
      if (!mongoose.Types.ObjectId.isValid(poster)) {
        return transforms.BadRequest(
          res,
          "L'identifiant de l'affiche n'est pas valide",
          "Invalid poster id",
          "poster",
        );
      }
    }

    // Backdrop
    if (backdrop !== undefined && backdrop !== null) {
      if (!mongoose.Types.ObjectId.isValid(backdrop)) {
        return transforms.BadRequest(
          res,
          "L'identifiant de l'image de fond n'est pas valide",
          "Invalid backdrop id",
          "backdrop",
        );
      }
    }

    // Trailer
    if (trailer !== undefined && trailer !== null) {
      if (!validator.IsString(trailer).Success) {
        return transforms.BadRequest(
          res,
          "Le trailer doit être une chaîne de caractères",
          "Trailer must be a string",
          "trailer",
        );
      }

      req.body.trailer = trailer.trim();
    }

    // Release Date
    if (releaseDate !== undefined && releaseDate !== null) {
      const date = new Date(releaseDate);

      if (isNaN(date.getTime())) {
        return transforms.BadRequest(
          res,
          "La date de sortie n'est pas valide",
          "Invalid release date",
          "releaseDate",
        );
      }

      req.body.releaseDate = date;
    }

    // Duration
    if (duration !== undefined && duration !== null) {
      if (!validator.IsNumber(duration).Success || duration < 1) {
        return transforms.BadRequest(
          res,
          "La durée du film doit être un nombre supérieur à zéro",
          "Movie duration must be a number greater than zero",
          "duration",
        );
      }
    }

    // Age Rating
    if (ageRating !== undefined && ageRating !== null) {
      if (!validator.IsString(ageRating).Success) {
        return transforms.BadRequest(
          res,
          "La classification d'âge doit être une chaîne de caractères",
          "Age rating must be a string",
          "ageRating",
        );
      }

      req.body.ageRating = ageRating.trim();
    }

    // Rating
    if (rating !== undefined && rating !== null) {
      if (!validator.IsNumber(rating).Success || rating < 0 || rating > 10) {
        return transforms.BadRequest(
          res,
          "La note doit être comprise entre 0 et 10",
          "Rating must be between 0 and 10",
          "rating",
        );
      }
    }

    // Vote Count
    if (voteCount !== undefined && voteCount !== null) {
      if (!validator.IsNumber(voteCount).Success || voteCount < 0) {
        return transforms.BadRequest(
          res,
          "Le nombre de votes n'est pas valide",
          "Invalid vote count",
          "voteCount",
        );
      }
    }

    // Genres
    if (genres !== undefined && genres !== null) {
      if (!Array.isArray(genres) || genres.length === 0) {
        return transforms.BadRequest(
          res,
          "La liste des genres ne peut pas être vide",
          "Genres must be a non-empty array",
          "genres",
        );
      }
      for (const genre of genres) {
        if (!mongoose.Types.ObjectId.isValid(genre)) {
          return transforms.BadRequest(
            res,
            "L'un des identifiants de genre n'est pas valide",
            "One of the genre ids is invalid",
            "genres",
          );
        }
      }
    }

    // Director
    if (director !== undefined && director !== null) {
      if (!mongoose.Types.ObjectId.isValid(director)) {
        return transforms.BadRequest(
          res,
          "L'identifiant du réalisateur n'est pas valide",
          "Invalid director id",
          "director",
        );
      }
    }

    // Writers
    if (writers !== undefined && writers !== null) {
      if (!Array.isArray(writers)) {
        return transforms.BadRequest(
          res,
          "Les scénaristes doivent être une liste",
          "Writers must be an array",
          "writers",
        );
      }

      for (const writer of writers) {
        if (!mongoose.Types.ObjectId.isValid(writer)) {
          return transforms.BadRequest(
            res,
            "L'un des identifiants de scénariste n'est pas valide",
            "One of the writer ids is invalid",
            "writers",
          );
        }
      }
    }

    // Actors
    if (actors !== undefined && actors !== null) {
      if (!Array.isArray(actors)) {
        return transforms.BadRequest(
          res,
          "Les acteurs doivent être une liste",
          "Actors must be an array",
          "actors",
        );
      }

      for (const actor of actors) {
        if (!mongoose.Types.ObjectId.isValid(actor)) {
          return transforms.BadRequest(
            res,
            "L'un des identifiants d'acteur n'est pas valide",
            "One of the actor ids is invalid",
            "actors",
          );
        }
      }
    }

    // Countries
    if (countries !== undefined && countries !== null) {
      if (!Array.isArray(countries)) {
        return transforms.BadRequest(
          res,
          "Les pays doivent être une liste",
          "Countries must be an array",
          "countries",
        );
      }

      for (const country of countries) {
        if (!validator.IsString(country).Success || !country.trim()) {
          return transforms.BadRequest(
            res,
            "Chaque pays doit être une chaîne de caractères valide",
            "Each country must be a valid string",
            "countries",
          );
        }
      }

      req.body.countries = countries.map((country) => country.trim());
    }

    // Languages
    if (languages !== undefined && languages !== null) {
      if (!Array.isArray(languages)) {
        return transforms.BadRequest(
          res,
          "Les langues doivent être une liste",
          "Languages must be an array",
          "languages",
        );
      }

      for (const language of languages) {
        if (!validator.IsString(language).Success || !language.trim()) {
          return transforms.BadRequest(
            res,
            "Chaque langue doit être une chaîne de caractères valide",
            "Each language must be a valid string",
            "languages",
          );
        }
      }

      req.body.languages = languages.map((language) => language.trim());
    }

    // Budget
    if (budget !== undefined && budget !== null) {
      if (!validator.IsNumber(budget).Success || budget < 0) {
        return transforms.BadRequest(
          res,
          "Le budget n'est pas valide",
          "Invalid budget",
          "budget",
        );
      }
    }

    // Revenue
    if (revenue !== undefined && revenue !== null) {
      if (!validator.IsNumber(revenue).Success || revenue < 0) {
        return transforms.BadRequest(
          res,
          "Les revenus ne sont pas valides",
          "Invalid revenue",
          "revenue",
        );
      }
    }

    // Status
    if (status !== undefined && status !== null) {
      if (
        !validator.IsInEnumList(status, {
          UPCOMING: "upcoming",
          RELEASED: "released",
          ENDED: "ended",
        }).Success
      ) {
        return transforms.BadRequest(
          res,
          "Le statut du film n'est pas valide",
          "Invalid movie status",
          "status",
        );
      }
    }

    next();
  }

  // GET /get-all-movies
  getAllMovies(req, res, next) {
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

  // GET /get-movie-details/:id
  getMovieDetails(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return transforms.BadRequest(
        res,
        "L'identifiant du film n'est pas valide",
        "Invalid movie id",
        "id",
      );
    }

    next();
  }

  // PATCH /edit-movie/:id
  editMovie(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return transforms.BadRequest(
        res,
        "L'identifiant du film n'est pas valide",
        "Invalid movie id",
        "id",
      );
    }

    const {
      title,
      originalTitle,
      slug,
      description,
      poster,
      backdrop,
      trailer,
      releaseDate,
      duration,
      ageRating,
      rating,
      voteCount,
      genres,
      director,
      writers,
      actors,
      countries,
      languages,
      budget,
      revenue,
      status,
    } = req.body;

    // Title
    if (title !== undefined) {
      if (
        !validator.IsString(title).Success ||
        !validator.Trim(title).Success
      ) {
        return transforms.BadRequest(
          res,
          "Le titre du film n'est pas valide",
          "Invalid movie title",
          "title",
        );
      }

      req.body.title = title.trim();
    }

    // Original Title
    if (originalTitle !== undefined && originalTitle !== null) {
      if (!validator.IsString(originalTitle).Success) {
        return transforms.BadRequest(
          res,
          "Le titre original doit être une chaîne de caractères",
          "Original title must be a string",
          "originalTitle",
        );
      }

      req.body.originalTitle = originalTitle.trim();
    }

    // Slug
    if (slug !== undefined) {
      if (!validator.IsString(slug).Success || !validator.Trim(slug).Success) {
        return transforms.BadRequest(
          res,
          "Le slug du film n'est pas valide",
          "Invalid movie slug",
          "slug",
        );
      }

      req.body.slug = slug.trim().toLowerCase();
    }

    // Description
    if (description !== undefined && description !== null) {
      if (!validator.IsString(description).Success) {
        return transforms.BadRequest(
          res,
          "La description doit être une chaîne de caractères",
          "Description must be a string",
          "description",
        );
      }

      req.body.description = description.trim();
    }

    // Poster
    if (poster !== undefined && poster !== null) {
      if (!mongoose.Types.ObjectId.isValid(poster)) {
        return transforms.BadRequest(
          res,
          "L'identifiant de l'affiche n'est pas valide",
          "Invalid poster id",
          "poster",
        );
      }
    }

    // Backdrop
    if (backdrop !== undefined && backdrop !== null) {
      if (!mongoose.Types.ObjectId.isValid(backdrop)) {
        return transforms.BadRequest(
          res,
          "L'identifiant de l'image de fond n'est pas valide",
          "Invalid backdrop id",
          "backdrop",
        );
      }
    }

    // Trailer
    if (trailer !== undefined && trailer !== null) {
      if (!validator.IsString(trailer).Success) {
        return transforms.BadRequest(
          res,
          "Le trailer doit être une chaîne de caractères",
          "Trailer must be a string",
          "trailer",
        );
      }

      req.body.trailer = trailer.trim();
    }

    // Release Date
    if (releaseDate !== undefined && releaseDate !== null) {
      const date = new Date(releaseDate);

      if (isNaN(date.getTime())) {
        return transforms.BadRequest(
          res,
          "La date de sortie n'est pas valide",
          "Invalid release date",
          "releaseDate",
        );
      }

      req.body.releaseDate = date;
    }

    // Duration
    if (duration !== undefined && duration !== null) {
      if (!validator.IsNumber(duration).Success || duration < 1) {
        return transforms.BadRequest(
          res,
          "La durée du film n'est pas valide",
          "Invalid movie duration",
          "duration",
        );
      }
    }

    // Age Rating
    if (ageRating !== undefined && ageRating !== null) {
      if (!validator.IsString(ageRating).Success) {
        return transforms.BadRequest(
          res,
          "La classification d'âge n'est pas valide",
          "Invalid age rating",
          "ageRating",
        );
      }

      req.body.ageRating = ageRating.trim();
    }

    // Rating
    if (rating !== undefined && rating !== null) {
      if (!validator.IsNumber(rating).Success || rating < 0 || rating > 10) {
        return transforms.BadRequest(
          res,
          "La note doit être comprise entre 0 et 10",
          "Rating must be between 0 and 10",
          "rating",
        );
      }
    }

    // Vote Count
    if (voteCount !== undefined && voteCount !== null) {
      if (!validator.IsNumber(voteCount).Success || voteCount < 0) {
        return transforms.BadRequest(
          res,
          "Le nombre de votes n'est pas valide",
          "Invalid vote count",
          "voteCount",
        );
      }
    }

    // Genres
    if (genres !== undefined && genres !== null) {
      if (!Array.isArray(genres) || genres.length === 0) {
        return transforms.BadRequest(
          res,
          "La liste des genres n'est pas valide",
          "Invalid genres list",
          "genres",
        );
      }

      for (const genre of genres) {
        if (!mongoose.Types.ObjectId.isValid(genre)) {
          return transforms.BadRequest(
            res,
            "L'un des identifiants de genre n'est pas valide",
            "One of the genre ids is invalid",
            "genres",
          );
        }
      }
    }

    // Director
    if (director !== undefined && director !== null) {
      if (!mongoose.Types.ObjectId.isValid(director)) {
        return transforms.BadRequest(
          res,
          "L'identifiant du réalisateur n'est pas valide",
          "Invalid director id",
          "director",
        );
      }
    }

    // Writers
    if (writers !== undefined && writers !== null) {
      if (!Array.isArray(writers)) {
        return transforms.BadRequest(
          res,
          "Les scénaristes doivent être une liste",
          "Writers must be an array",
          "writers",
        );
      }

      for (const writer of writers) {
        if (!mongoose.Types.ObjectId.isValid(writer)) {
          return transforms.BadRequest(
            res,
            "L'un des identifiants de scénariste n'est pas valide",
            "One of the writer ids is invalid",
            "writers",
          );
        }
      }
    }

    // Actors
    if (actors !== undefined && actors !== null) {
      if (!Array.isArray(actors)) {
        return transforms.BadRequest(
          res,
          "Les acteurs doivent être une liste",
          "Actors must be an array",
          "actors",
        );
      }

      for (const actor of actors) {
        if (!mongoose.Types.ObjectId.isValid(actor)) {
          return transforms.BadRequest(
            res,
            "L'un des identifiants d'acteur n'est pas valide",
            "One of the actor ids is invalid",
            "actors",
          );
        }
      }
    }

    // Countries
    if (countries !== undefined && countries !== null) {
      if (!Array.isArray(countries)) {
        return transforms.BadRequest(
          res,
          "Les pays doivent être une liste",
          "Countries must be an array",
          "countries",
        );
      }

      for (const country of countries) {
        if (!validator.IsString(country).Success || !country.trim()) {
          return transforms.BadRequest(
            res,
            "Chaque pays doit être une chaîne de caractères valide",
            "Each country must be a valid string",
            "countries",
          );
        }
      }

      req.body.countries = countries.map((country) => country.trim());
    }

    // Languages
    if (languages !== undefined && languages !== null) {
      if (!Array.isArray(languages)) {
        return transforms.BadRequest(
          res,
          "Les langues doivent être une liste",
          "Languages must be an array",
          "languages",
        );
      }

      for (const language of languages) {
        if (!validator.IsString(language).Success || !language.trim()) {
          return transforms.BadRequest(
            res,
            "Chaque langue doit être une chaîne de caractères valide",
            "Each language must be a valid string",
            "languages",
          );
        }
      }

      req.body.languages = languages.map((language) => language.trim());
    }

    // Budget
    if (budget !== undefined && budget !== null) {
      if (!validator.IsNumber(budget).Success || budget < 0) {
        return transforms.BadRequest(
          res,
          "Le budget n'est pas valide",
          "Invalid budget",
          "budget",
        );
      }
    }

    // Revenue
    if (revenue !== undefined && revenue !== null) {
      if (!validator.IsNumber(revenue).Success || revenue < 0) {
        return transforms.BadRequest(
          res,
          "Les revenus ne sont pas valides",
          "Invalid revenue",
          "revenue",
        );
      }
    }

    // Status
    if (status !== undefined && status !== null) {
      if (
        !validator.IsInEnumList(status, {
          UPCOMING: "upcoming",
          RELEASED: "released",
          ENDED: "ended",
        }).Success
      ) {
        return transforms.BadRequest(
          res,
          "Le statut du film n'est pas valide",
          "Invalid movie status",
          "status",
        );
      }
    }

    next();
  }

  // DELETE /delete-movie/:id
  deleteMovie(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return transforms.BadRequest(
        res,
        "L'identifiant du film n'est pas valide",
        "Invalid movie id",
        "id",
      );
    }

    next();
  }
})();
