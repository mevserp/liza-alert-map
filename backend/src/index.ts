import "dotenv/config";
import express from "express";
import { ActiveSearchUrlsParser } from "./feature/active-search-urls-parser.class";
import { ActiveSearchParser } from "./feature/active-search-parser.class";
import { ActiveSearchModel } from "./declarations/models/active-search.model";
import { getActiveSearchListByUrls } from "./declarations/functions/get-active-search-list-by-urls.function";
import cors from 'cors';

const app = express();
app.use(cors());

const activeSearchByUrlCache: Map<string, ActiveSearchModel.View> = new Map<string, ActiveSearchModel.View>();

app.get("/activeSearchList", async (req, res) => {
  const activeSearchUrls: string[] = await new ActiveSearchUrlsParser().parse();

  if (activeSearchByUrlCache.size > 0) {
    res.json([...activeSearchByUrlCache.values()]);
    return;
  }

  const activeSearchList: ActiveSearchModel.View[] = await getActiveSearchListByUrls(activeSearchUrls, (url: string) =>
      new ActiveSearchParser(url).parse()
  );

  const availableActiveSearchList: ActiveSearchModel.View[] = activeSearchList.filter(
      ({ coordinates }: ActiveSearchModel.View) => !coordinates.includes(Infinity)
  );

  availableActiveSearchList.forEach((item: ActiveSearchModel.View) => {
    activeSearchByUrlCache.set(item.url, item);
  })

  // JSON
  res.json(availableActiveSearchList);

  // VIEW
  // res.send(
  //   availableActiveSearchList
  //     .map(
  //       (info: ActiveSearchModel.View) => `
  //       <p>
  //           <a href="${info.url}">${info.name}</a>: <b>${info.coordinates.join(", ")}</b>
  //       </p>
  //     `
  //     )
  //     .join("")
  // );
});

app.listen(process.env.PORT, () => {
  console.log(`The app is listening on port ${process.env.PORT}!`);
});
