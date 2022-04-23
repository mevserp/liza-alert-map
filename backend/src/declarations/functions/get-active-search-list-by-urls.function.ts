import { ActiveSearchModel } from "../models/active-search.model";

export async function getActiveSearchListByUrls(
  urls: string[],
  createParseFn: (url: string) => Promise<ActiveSearchModel.View>
) {
  const getActiveSearchList = async (urls: string[], index: number = 0): Promise<ActiveSearchModel.View[]> => {
    console.log(index, urls[index]);

    let activeSearchList: ActiveSearchModel.View[] = [];

    try {
      const activeSearch: ActiveSearchModel.View = await createParseFn(urls[index]);
      activeSearchList.push(activeSearch);
    } catch (error: unknown) {
      console.log(`getActiveSearchList; index: ${index}; url: ${urls[index]}`, index, error);
    }

    if (index < urls.length - 1) {
      return [...activeSearchList, ...(await getActiveSearchList(urls, index + 1))];
    }

    return activeSearchList;
  };

  return await getActiveSearchList(urls);
}
