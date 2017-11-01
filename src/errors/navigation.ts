export enum NavigationErrorCodes {
  FAILED = 'ERR_NAV_FAILED',
  TIMEOUT = 'ERR_NAV_TIMEOUT',
  UNEXPECTED_DESTINATION = 'ERR_NAV_UNEXPECTED_DESTINATION'
}

export class NavigationError extends Error {
  public code: NavigationErrorCodes;
  public url: string;

  constructor(message: string, code: NavigationErrorCodes, url: string) {
    super(message);
    this.code = code;
    this.url = url;
  }
}
