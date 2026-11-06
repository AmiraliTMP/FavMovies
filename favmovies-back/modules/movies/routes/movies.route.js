const express = require("express");

const router = express.Router();

const movieController = require("../controllers/movies.controller");

const movieMiddleware = require("../middlewares/movies.middleware");

// POST /add-movie
router.post(
  "/v1/add-movie",
  movieMiddleware.addMovie,
  movieController.createMovie.bind(movieController),
);

// GET /get-all-movies
router.get(
  "/v1/get-all-movies",
  movieMiddleware.getAllMovies,
  movieController.getAllMovies.bind(movieController),
);

// GET /get-movie-details/:id
router.get(
  "/v1/get-movie-details/:id",
  movieMiddleware.getMovieDetails,
  movieController.getMovieById.bind(movieController),
);

// PATCH /edit-movie/:id
router.patch(
  "/v1/edit-movie/:id",
  movieMiddleware.editMovie,
  movieController.updateMovie.bind(movieController),
);

// DELETE /delete-movie/:id
router.delete(
  "/v1/delete-movie/:id",
  movieMiddleware.deleteMovie,
  movieController.deleteMovie.bind(movieController),
);

module.exports = router;
