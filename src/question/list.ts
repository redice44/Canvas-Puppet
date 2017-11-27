import * as Puppeteer from 'puppeteer';

import { Question, Answers } from './interfaces';

import selectors from './selectors';

export default async function getQuestions( page: Puppeteer.Page ): Promise < Question[] > {

  // const expandQuestions = async ( questions: NodeListOf < HTMLElement >, page, linkSelector, parentSelector ) => {

  //   for ( let i = 0; i < questions.length; i++ ) {

  //     if ( questions[ i ].querySelector( linkSelector ) ) {


  //       await page.click( `${ parentSelector.replace( 'INDEX', ''+i ) } > ${ linkSelector }`);

  //     }

  //   }

  // }

  const extractQuestions = ( questions: NodeListOf < HTMLElement >, selectors, questionTypes ) => {

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
      const id = questions[ i ].id.split( '_' )[ 1 ];
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

  const showDetails = ( checkboxEl: HTMLInputElement ) => {

    if ( !checkboxEl.checked ) {

      checkboxEl.click();
      return false;

    }

    return true;

  };

  const needsExpanding = await page.$eval( selectors.questionDetails, showDetails );

  if ( needsExpanding ) {

    const numQuestions = await page.$$eval( selectors.list, questions => questions.length );

    for ( let i = 1; i <= numQuestions; i++ ) {

      await page.click( `${ selectors.question.isLinkParent.replace( 'INDEX', ''+i ) } > ${ selectors.question.isLink }`);

    }

  }

  // @ts-ignore
  return await page.$$eval( selectors.list, extractQuestions, selectors.question, selectors.questionTypes );

}
