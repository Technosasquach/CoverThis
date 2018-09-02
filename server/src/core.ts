// Inital server setup
// ----------------------------------------------------------------------------
import * as express from "express";
import * as http from "http";
const app = express();
export const App = app;
const server = http.createServer(app);
const io = require("socket.io")(server);
export const Server = server;

// Utilities
// ----------------------------------------------------------------------------
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as logger from "morgan";
import * as fs from "fs";
import * as lusca from "lusca";
import * as path from "path";


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
} else {
    app.locals.pretty = true;
}


import { Index } from "elasticlunr";
export const elastSearch = new Index();
elastSearch.addField("Title");      // Title of book
elastSearch.addField("Summary");    // Summary
elastSearch.addField("Aurthor");    // Author
elastSearch.addField("Category");   // Category
elastSearch.setRef("ID");           // ID
import { books } from "./data/second_dump";
books.forEach((val: any) => {
    elastSearch.addDoc(val);
});

import routes from "./controllers/routes";
app.use("/", routes);

// The last route run
import { Request, Response } from "express";
app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "./../../../client/dist/index.html"));
});