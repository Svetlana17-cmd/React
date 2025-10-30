const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/midlleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const { personsRouter, infoRouter } = require("./controllers/persons");
const morgan = require("morgan");

morgan.token("body", (req) => JSON.stringify(req.body));

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body",
    ),
);
app.use(middleware.requestLogger);

app.use("/api/persons", personsRouter);
app.use("/api/info", infoRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
