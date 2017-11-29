import * as Puppeteer from 'puppeteer';

import { Question } from './interfaces';
import { createQuestion as selectors } from './selectors';

export default async function createQuestion( page: Puppeteer.Page, question: Question ) {

  await page.click( selectors.addBtn );

  if ( question.title ) {

    await page.keyboard.type( question.title );

  }

  const updateValue = ( eh, value ) => { eh.value = value; };

  await page.$eval( selectors.type, updateValue, question.type );

  // Navigate to the question area in tiny mc.
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( 'Tab' );
  await page.keyboard.press( '\r' );

  await page.keyboard.type( question.text );

  let answerInputs = await page.$$eval( selectors.answers, eh => eh.length );

  while ( answerInputs < question.answers.length ) {

    await page.click(selectors.anotherA);
    answerInputs++;

  }

  while ( answerInputs > question.answers.length ) {

    await page.click( `${ selectors.answers }:nth-child(${ answerInputs })` );
    await page.click( selectors.deleteA.replace( 'INDEX', answerInputs ) );
    answerInputs--;

  }

  for ( let i = 1; i <= question.answers.length; i++ ) {

    await page.click( selectors.answerInput.replace( 'INDEX', '' + i ) );
    await page.keyboard.type( question.answers[ i - 1 ].text );

    if ( question.answers[ i - 1 ].correct) {

      await page.click( selectors.correctA.replace( 'INDEX', '' + i ) );

    }

    if ( question.answers[ i - 1 ].feedback ) {

      await page.click( selectors.feedback.replace( 'INDEX', '' + i ) );
      await page.keyboard.type( question.answers[ i - 1 ].feedback );
      await page.keyboard.press( 'Tab' );
      await page.keyboard.press( 'Enter' );

    }

  }

  await page.click( selectors.submitBtn );
  await page.waitFor( 100 );

}
