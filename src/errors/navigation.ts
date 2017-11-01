export enum NavigationErrorCodes {
  FAILED = 'ERR_FAILED',
  TIMEOUT = 'ERR_TIMEOUT'
}

export class NavigationError extends Error {
  public code: NavigationErrorCodes;
  public url: string;

  constructor(message: string, url: string, code: NavigationErrorCodes) {
    super(message);
    this.url = url;
    this.code = code;
  }
}
