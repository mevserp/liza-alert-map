import "dotenv/config";
import express from "express";
import {ActiveSearchLinksParser} from "./feature/active-search-links-parser.class";


const app = express();

app.get("/", async (req, res) => {
  const activeSearchLinks: string[] = await new ActiveSearchLinksParser().parse();
  res.send(activeSearchLinks.map((link: string) => `<a href="${link}">${link}</a></br>`).join(''));
});

app.listen(process.env.PORT, () => {
  console.log(`The app is listening on port ${process.env.PORT}!`);
});
