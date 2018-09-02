import { Router, Request, Response, NextFunction } from "express";
import { elastSearch } from "./../core";

import { books } from "./../data/second_dump";

const app = Router();

// app.get("*", (req: Request, res: Response) => {
    
// });

app.post("/search/:searchText", (req: Request, res: Response) => {
    const searchResults = elastSearch.search(
        req.params.searchText + "",
        {
            fields: {
                Title: {boost: 2},
                Summary: {boost: 2},
                Aurthor: {boost: 1}
            }
        }
    );
    res.json(searchResults);
});

app.post("/books/:id", (req: Request, res: Response) => {
    const foundBooks: any = [];
    let foundSomething = false;
    books.filter((val: any) => {
        if(val["ID"] == req.params.id) {
            foundSomething = true;
            foundBooks.push(val);
        }
    });
    res.json(foundBooks);
});

export default app;