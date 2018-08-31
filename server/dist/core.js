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
<<<<<<< HEAD
// Dependencies
// ----------------------------------------------------------------------------
const mongoose = require("mongoose");
const passport = require("passport");
exports.Passport = passport;
=======
>>>>>>> feature-frontend
// Utilities
// ----------------------------------------------------------------------------
const compression = require("compression");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
const session = require("express-session");
=======
>>>>>>> feature-frontend
const bodyParser = require("body-parser");
const errorHandler = require("errorhandler");
const logger = require("morgan");
const lusca = require("lusca");
<<<<<<< HEAD
// import * as mongo from "connect-mongo";
const path = require("path");
// MongooseDB
// ----------------------------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/above22water");
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});
=======
const path = require("path");
>>>>>>> feature-frontend
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
<<<<<<< HEAD
// Mounts the session store with an auto loader into MongooseDB
const MongoStore = require("connect-mongo")(session);
// Allows the session storage to be put into mongoose
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "above22watersessionsecret",
    store: new MongoStore({
        host: "127.0.0.1",
        port: "27017",
        db: "session",
        url: "mongodb://localhost:27017/above22water",
        autoReconnect: true
    })
}));
// Starts the user account session
app.use(passport.initialize());
app.use(passport.session());
=======
>>>>>>> feature-frontend
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