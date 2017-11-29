import * as Puppeteer from 'puppeteer';

import { Question } from './interfaces';
import { updateQuestion as selectors } from './selectors';

export default async function updateQuestion( page: Puppeteer.Page, question: Question ) {

  const questionRootEH = ( await page.evaluateHandle( ( id ) => {

    const questionEl = document.querySelector( id ).parentElement;

    return Promise.resolve( questionEl );

  }, `#question_${ question.id }` ) ).asElement();

  const questionEH = await questionRootEH.$( `#question_${ question.id }` );
  await questionEH.hover();
  const editEH = await questionEH.$( selectors.link );
  await editEH.click();
  const questionFormEH = await questionRootEH.$( selectors.form );

  const clearInputText = inputEH => { inputEH.value = ''; };
  const clearTextArea = textEH => { textEH.innerHTML = ''; textEH.value = ''; };
  const updateValue = ( eh, value ) => { eh.value = value; };

  if ( question.title ) {

    const titleEH = await questionFormEH.$( selectors.questionTitle );
    await page.evaluate( clearInputText, titleEH );
    await page.keyboard.type( question.title );

  }

  const questionTypeEH = await questionFormEH.$( selectors.type );
  await page.evaluate( updateValue, questionTypeEH, question.type );

  // Navigate to the question area in tiny mc.
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( '\r' );

  const bodyEH = await questionFormEH.$( selectors.body );
  await page.evaluate( clearTextArea, bodyEH );

  await page.keyboard.type( question.text );

  const answersEH = await questionFormEH.$$( selectors.answers );
  const addAnswer = await questionFormEH.$( selectors.anotherA );
  let answerInputs = answersEH.length;

  while ( answerInputs < question.answers.length ) {

    await addAnswer.click();
    answerInputs++;

  }

  while ( answerInputs > question.answers.length ) {

    const lastAnswer = await questionFormEH.$( `${ selectors.answers }:nth-child(${ answerInputs })` );
    await lastAnswer.hover();
    await ( await lastAnswer.$( selectors.deleteA ) ).click();
    answerInputs--;

  }

  for ( let i = 0; i < question.answers.length; i++ ) {

    await answersEH[ i ].hover();
    await page.evaluate( clearInputText, answersEH[ i ] );
    await answersEH[ i ].click();
    await page.keyboard.type( question.answers[ i ].text );

    if ( question.answers[ i ].correct) {

      await ( await answersEH[ i ].$( selectors.correctA ) ).click();

    }

    if ( question.answers[ i ].feedback ) {

      await ( await answersEH[ i ].$( selectors.feedback ) ).click();
      await ( await answersEH[ i ].$( selectors.htmlView ) ).click();
      const feedbackBody = await answersEH[ i ].$( selectors.feedbackBody );
      await page.evaluate( clearTextArea, feedbackBody );

      await page.keyboard.type( question.answers[ i ].feedback );
      await page.keyboard.press( 'Tab' );
      await page.keyboard.press( 'Enter' );

    }

  }

  await ( await questionFormEH.$( selectors.submitBtn ) ).click();
  await page.waitFor( 100 );

}
