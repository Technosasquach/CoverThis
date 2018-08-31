import { Router, Request, Response, NextFunction } from "express";
const app = Router();

app.post("/", (req: Request, res: Response) => {
    res.json({ message: "API is active"});
});

export default app;