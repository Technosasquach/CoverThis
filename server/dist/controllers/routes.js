"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const core_1 = require("./../core");
const bookListing_1 = require("./../data/bookListing");
const app = express_1.Router();
// app.get("*", (req: Request, res: Response) => {
// });
app.post("/search/:searchText", (req, res) => {
    const searchResults = core_1.elastSearch.search(req.params.searchText + "");
    res.json(searchResults);
});
app.post("/books/:id", (req, res) => {
    const foundBooks = [];
    let foundSomething = false;
    bookListing_1.books.filter((val) => {
        if (val["AMAZON ID"] == req.params.id) {
            foundSomething = true;
            foundBooks.push(val);
        }
    });
    res.json(foundBooks);
});
exports.default = app;
//# sourceMappingURL=routes.js.map