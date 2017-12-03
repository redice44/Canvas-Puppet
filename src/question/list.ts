import * as Puppeteer from 'puppeteer';

import { Question, Answers } from './interfaces';

import selectors from './selectors';

export default async function getQuestions( page: Puppeteer.Page ): Promise < Question[] > {

  const extractQuestions = ( questions, selectors, questionTypes ) => {

    const getQuestionType = ( questionEl, questionTypes ) => {

      for ( let i = 0; i < questionTypes.length; i++ ) {

        if ( questionEl.classList.contains( questionTypes[ i ] ) ) {

          return questionTypes[ i ];

        }

      }

      return null;

    }

    const formattedQuestions: Question[] = [];

    for ( let i = 0; i < questions.length; i++ ) {

      const title = questions[ i ].querySelector( selectors.title ).innerHTML.trim();
      const id = questions[ i ].querySelector( selectors.root ).id.split( '_' )[ 1 ];
      const text = questions[ i ].querySelector( selectors.text ).innerHTML.trim();
      const answersEl: NodeListOf < HTMLElement > = questions[ i ].querySelectorAll( selectors.answers );
      const answers: Answers[] = [];
      const type = getQuestionType( questions[ i ].querySelector( selectors.root ), questionTypes );

      for ( let j = 0; j < answersEl.length; j++ ) {

        const ansText = answersEl[ j ].querySelector( selectors.answerText ).innerHTML.trim();
        const correct = answersEl[ j ].classList.contains( selectors.correct );

        answers.push( {

          text: ansText,
          correct: correct

        } );

      }

      formattedQuestions.push( {

        id: id,
        title: title,
        text: text,
        type: type,
        answers: answers

      } );
    }

    return formattedQuestions;

  };

  const showDetails = ( checkboxEl ) => {

    if ( !checkboxEl.checked ) {

      checkboxEl.click();
      return false;

    }

    return true;

  };

  const needsExpanding = await page.$eval( selectors.questionDetails, showDetails );

  if ( needsExpanding ) {

    let numQuestions = await page.$$( `${ selectors.list } ${ selectors.question.isLink }` );

    while ( numQuestions.length > 0 ) {

      for ( let i = 0; i < numQuestions.length; i++ ) {

        // await page.click( `${ selectors.question.isLinkParent.replace( 'INDEX', ''+i ) } > ${ selectors.question.isLink }`);
        await numQuestions[ i ].click();

      }

      numQuestions = await page.$$( `${ selectors.list } ${ selectors.question.isLink }` );

    }

  }

  return await page.$$eval( selectors.list, extractQuestions, selectors.question, selectors.questionTypes );

}
