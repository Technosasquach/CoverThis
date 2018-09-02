"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = express_1.Router();
app.post("/", (req, res) => {
    res.json({ message: "API is active" });
});
exports.default = app;
//# sourceMappingURL=routes.js.map