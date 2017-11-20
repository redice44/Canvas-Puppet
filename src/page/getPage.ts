import * as Puppeteer from 'puppeteer';

import { Page } from '../interfaces/page';

export default async function getPage( page: Puppeteer.Page ): Promise < Page > {

  return await page.evaluate(() => {

    // @ts-ignore
    const env = window.ENV;

    return {

      id: parseInt( env.WIKI_PAGE.page_id ),
      title: env.WIKI_PAGE.title,
      content: env.WIKI_PAGE.body

    };

  });

}