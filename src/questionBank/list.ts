import * as Puppeteer from 'puppeteer';

import { QuestionBank } from './interfaces';

import { listSelectors as selectors } from './selectors';

export default async function getBanks( page: Puppeteer.Page ): Promise < QuestionBank[] > {

  const extractQuestionBanks = ( banks, selector ) => {

    const questionBanks: QuestionBank[] = [];

    for ( let i = 0; i < banks.length; i++ ) {

      questionBanks.push( {

        id: banks[ i ].id.substr( 14 ),
        title: banks[ i ].querySelector( selector ).innerText

      } );

    }

    return questionBanks;

  };

  return await page.$$eval( selectors.list, extractQuestionBanks, selectors.title );

}
