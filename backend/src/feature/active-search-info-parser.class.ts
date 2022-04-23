import puppeteer from 'puppeteer';

export interface ActiveSearchInfo {
  name: string;
  coordinates: [number, number];
}

export class ActiveSearchInfoParser {
  constructor(private readonly startUrl: string) {
  }

  public async parse(): Promise<ActiveSearchInfo> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.startUrl);

    const name: string = await page.evaluate(
        () => {
          const TITLE_CSS_CLASS: string = 'topic-title';

          const headElement: HTMLHeadElement | null = document.querySelector<HTMLHeadElement>(`.${TITLE_CSS_CLASS}`);

          return headElement?.textContent ?? '';
        }
    );

    const postsTexts: string[] = await page.evaluate(
        () => {
          const POST_CSS_CLASS: string = 'post';

          const nodes: NodeListOf<HTMLDivElement> = document.querySelectorAll<HTMLDivElement>(`.${POST_CSS_CLASS}`);

          const postElements: HTMLDivElement[] = [...nodes];

          const postContentElements: HTMLDivElement[] = postElements.map(
              (item: HTMLDivElement) => item.querySelector<HTMLDivElement>('.content')
          ).filter((item: HTMLDivElement | null): item is HTMLDivElement => Boolean(item));

          return postContentElements.map(
              (item: HTMLDivElement) => item.textContent
          ).filter(
              (textContent: string | null): textContent is string => Boolean(textContent)
          );
        }
    ) ?? [];

    const regExpPattern: RegExp = new RegExp(/\d\d[.]\d\d\d\d\d\d[,]\d\d[.]\d\d\d\d\d\d/g)
    const texts: RegExpMatchArray[] = postsTexts.map(
        (item: string) => item.trim().split(' ').join('').match(regExpPattern)
    ).filter(
        (regExpArray: RegExpMatchArray | null): regExpArray is RegExpMatchArray => Boolean(regExpArray)
    );


    const coordinates: number[] = texts.slice(-1)?.[0]?.[0].split(',').map(Number) ?? [0, 0];

    return {
      name,
      coordinates: [coordinates[0], coordinates[1]],
    }
  }
}
