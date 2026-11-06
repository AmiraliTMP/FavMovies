const Express = require("express");
const app = Express();
const http = require("http");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Cors = require("cors");
const Helmet = require("helmet");
const session = require("express-session");
const errorhandler = require("errorhandler");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const path = require("path");
const YAML = require("yamljs");
const allroutes = require("./routes");
global.Config = require("dotenv");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "transaction"));

app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json({ type: "application/json" }));
app.use("/uploads", Express.static(path.join(__dirname, "uploads")));

global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  const serverTime = new Date().toISOString(); // Or use Date.now() for epoch
  res.setHeader("X-Server-Time", serverTime);
  next();
});

Mongoose.connect(process.env.DB_PUBLIC)
  .then(() => {
    console.info("Database connected successfully.");
  })
  .catch((error) => {
    console.error(`Error connecting to database :\n${error}`);
  });
Mongoose.set("strictQuery", false);

Mongoose.Promise = global.Promise;
app.use(require("morgan")("dev"));
app.use(Helmet());
app.use(Helmet.noSniff());
app.use(Helmet.xssFilter());
app.use(Express.static("files"));

app.use(
  Cors({
    exposedHeaders: ["Content-Type", "Authorization", "X-Server-Time"],
  }),
);
app.use(
  session({
    secret: "OnlineWaiter",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(errorhandler());
  // Mongoose.set('debug', true);
}

app.use("/api", allroutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server running on port ${port} for ${process.env.DataBase} database.`,
  );
});
