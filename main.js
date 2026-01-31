import express from "express";
import bodyParser from "body-parser";
import IconsService from "./icon.service.js";

const app = express();
app.use(bodyParser.json());


app.get("/icons", (req, res) => {
    const { q = '', page = 1, limit = 20 } = req.query;

    const iconsService = new IconsService();
    const icons = iconsService.search({
        query: q,
        page,
        limit,
    });

    res.json({ icons, meta: {msg: 'Icons powered by fontawesome', link:'https://fontawesome.com/icons', IconFlyAuthor: 'santu sarkar', GithubLink: 'https://github.com/dip20' }});
});

app.listen(3001, () => {
    console.log(`Server started on port http://localhost:3001`);
});