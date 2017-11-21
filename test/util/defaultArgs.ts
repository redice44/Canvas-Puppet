import getArgv from './getArgv';

export default function () {
  const argv = getArgv();
  const opts = {

    headless: true,

  }

  for ( let i = 0; i < argv.length; i++ ) {

    switch ( argv[ i ] ) {

      case '-h':
        opts.headless = false;
        break;

      case '-s':
        process.env.RUN_SILENT = '1';
        break;

    }

  }

  return opts;

}
