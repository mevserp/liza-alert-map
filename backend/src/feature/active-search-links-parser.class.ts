import puppeteer from 'puppeteer';

const FORUM_URL: string = 'https://lizaalert.org/forum/';
const ACTIVE_SEARCH_LIST_LINK_TEXT: string = 'Активные поиски';

export class ActiveSearchLinksParser {
  public async parse(): Promise<string[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(FORUM_URL);

    const linkElement: puppeteer.ElementHandle<HTMLLinkElement> | null = await page.waitForXPath(`//a[contains(., '${ACTIVE_SEARCH_LIST_LINK_TEXT}')]`);
    const activeSearchListUrl: string | undefined = await (await linkElement?.getProperty('href'))?.jsonValue();

    if (typeof activeSearchListUrl !== 'string') {
      throw new Error(`type of activeSearchListUrl: ${activeSearchListUrl} is not a string`);
    }

    if (activeSearchListUrl.length <= 0) {
      throw new Error(`activeSearchListUrl: ${activeSearchListUrl} is empty string`);
    }

    await page.goto(activeSearchListUrl);

    const activeSearchListLinks: string[] = await page.evaluate(
        () => {
          const SEARCH_LINKS_CSS_CLASS: string = 'topictitle';
          const nodes: NodeListOf<HTMLLinkElement> = document.querySelectorAll<HTMLLinkElement>(`.${SEARCH_LINKS_CSS_CLASS}`);
          const linkElements: HTMLLinkElement[] = [...nodes];
          return linkElements.map((link: HTMLLinkElement) => link.href);
        }
    ) ?? [];

    await browser.close();

    return activeSearchListLinks;
  }
}
