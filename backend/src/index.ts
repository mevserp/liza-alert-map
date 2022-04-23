import "dotenv/config";
import express from "express";
import {ActiveSearchUrlsParser} from "./feature/active-search-urls-parser.class";
import {ActiveSearchParser} from "./feature/active-search-parser.class";
import {ActiveSearchModel} from "./declarations/models/active-search.model";
import {getActiveSearchListByUrls} from "./declarations/functions/get-active-search-list-by-urls.function";

const app = express();

app.get("/", async (req, res) => {
  const activeSearchUrls: string[] = await new ActiveSearchUrlsParser().parse();

  const activeSearchList: ActiveSearchModel.View[] = await getActiveSearchListByUrls(activeSearchUrls, (url: string) => new ActiveSearchParser(url).parse());

  const availableActiveSearchList: ActiveSearchModel.View[] = activeSearchList.filter(({coordinates}: ActiveSearchModel.View) => !coordinates.includes(Infinity));

  // JSON
  // res.json(availableActiveSearchList);

  // VIEW
  res.send(
      availableActiveSearchList.map((info: ActiveSearchModel.View) => `
        <p>
            <a href="${info.url}">${info.name}</a>: <b>${info.coordinates.join(', ')}</b>
        </p>
      `).join('')
  );
});

app.listen(process.env.PORT, () => {
  console.log(`The app is listening on port ${process.env.PORT}!`);
});
