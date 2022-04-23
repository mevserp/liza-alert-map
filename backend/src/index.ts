import "dotenv/config";
import express from "express";
import {ActiveSearchLinksParser} from "./feature/active-search-links-parser.class";
import {ActiveSearchInfo, ActiveSearchInfoParser} from "./feature/active-search-info-parser.class";


const app = express();

app.get("/", async (req, res) => {
  const activeSearchLinks: string[] = await new ActiveSearchLinksParser().parse();

  const allInfos: ActiveSearchInfo[] = await Promise.all(activeSearchLinks.map((link: string) => new ActiveSearchInfoParser(link).parse()))

  res.send(allInfos.map((info: ActiveSearchInfo) => `<p>${info.name}: <b>${info.coordinates.join(', ')}</b></p>`).join('<br/>'));
});

app.listen(process.env.PORT, () => {
  console.log(`The app is listening on port ${process.env.PORT}!`);
});
