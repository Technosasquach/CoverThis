"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Inital server setup
// ----------------------------------------------------------------------------
const express = require("express");
const http = require("http");
const app = express();
exports.App = app;
const server = http.createServer(app);
const io = require("socket.io")(server);
exports.Server = server;
// Utilities
// ----------------------------------------------------------------------------
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const logger = require("morgan");
const lusca = require("lusca");
const path = require("path");
// Server Configuration
// ----------------------------------------------------------------------------
app.set("port", process.env.PORT || 3000);
// Static content delivery compression
app.use(compression());
// URL/URI and HTTP content decoding and parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Cookie content decoding and parsing
app.use(cookieParser());
// Allows CORS
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
// Pretty prints in console
app.use(errorHandler());
app.use(logger("dev"));
app.use(express.static(__dirname + "/../../client/dist"));
// Prod vs Dev code and display
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
}
else {
    app.locals.pretty = true;
}
const routes_1 = require("./controllers/routes");
app.use("/", routes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../../../client/dist/index.html"));
});
//# sourceMappingURL=core.js.map