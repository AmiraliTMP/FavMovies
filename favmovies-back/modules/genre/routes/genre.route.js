const express = require("express");
const router = express.Router();
const GenreController = require("../controllers/genre.controller");
const GenreMiddleware = require("../middlewares/genre.middleware");

// GET ALL GENRES
router.get(
  "/v1/get-all-genres",
  GenreMiddleware.getAllGenres.bind(GenreMiddleware),
  GenreController.getAllGenres,
);

// CREATE GENRE
router.post(
  "/v1/add-genre",
  GenreMiddleware.addGenre.bind(GenreMiddleware),
  GenreController.createGenre,
);

// GET GENRE DETAILS
router.get(
  "/v1/get-genre-by-id/:id",
  GenreMiddleware.getGenreDetails.bind(GenreMiddleware),
  GenreController.getGenreById,
);

// UPDATE GENRE
router.patch(
  "/v1/update-genre/:id",
  GenreMiddleware.editGenre.bind(GenreMiddleware),
  GenreController.updateGenre,
);

// DELETE GENRE
router.delete(
  "/v1/delete-genre/:id",
  GenreMiddleware.deleteGenre.bind(GenreMiddleware),
  GenreController.deleteGenre,
);

module.exports = router;
