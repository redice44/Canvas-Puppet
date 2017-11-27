import getArgv from './getArgv';

export default function () {
  const argv = getArgv();
  const opts = {

    devTools: false,
    finish: true,
    headless: true

  }

  for ( let i = 0; i < argv.length; i++ ) {

    switch ( argv[ i ] ) {

      case '-h':
      case '--headless':
        opts.headless = false;
        break;

      case '-s':
      case '--silent':
        process.env.RUN_SILENT = '1';
        break;

      case '-f':
      case '--finish':
        opts.finish = false;
        break;

      case '-d':
      case '--dev-tools':
        opts.devTools = true;
        break;

    }

  }

  return opts;

}
