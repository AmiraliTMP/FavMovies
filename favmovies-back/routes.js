const express = require("express");
const router = express.Router();

const adminRouts = require("./modules/admin/routes/admin.routes");
const userRouts = require("./modules/user/routes/user.routes");
const fileRouts = require("./modules/files/routes/file.routes");
const ticketRoutes = require("./modules/ticket/routes/ticket.routes");
const packageRoute = require("./modules/packages/routes/packages.routes");
const notificationRoutes = require("./modules/notification/routes/notification.routes");
const fcmRoutes = require("./modules/fcm/fcm.routes");
const genreRoutes = require("./modules/genre/routes/genre.route");
const moviesRoutes = require("./modules/movies/routes/movies.route");

router.use("/file", fileRouts);
router.use("/ticket", ticketRoutes);
router.use("/user", userRouts);
router.use("/admin", adminRouts);
router.use("/package", packageRoute);
router.use("/notification", notificationRoutes);
router.use("/fcm", fcmRoutes);
router.use("/genre", genreRoutes);
router.use("/movies", moviesRoutes);

module.exports = router;
