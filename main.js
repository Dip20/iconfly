import express from "express";
import bodyParser from "body-parser";
import IconsService from "./icon.service.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

const iconsService = new IconsService();

app.get("/icons", (req, res) => {
    const { q = '', page = 1, limit = 20,style='' } = req.query;

    const icons = iconsService.search({
        query: q,
        page,
        limit,
        style,
    });

    res.json({ icons, meta: {msg: 'Icons powered by fontawesome', link:'https://fontawesome.com/icons', IconFlyAuthor: 'santu sarkar', GithubLink: 'https://github.com/dip20' }});
});

app.listen(3001, () => {
    console.log(`Server started on port http://localhost:3001`);
});