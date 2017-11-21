export default function getArgv() {

  if ( process.argv.length < 3 ) { return []; }

  return process.argv.slice( 2 );

}
