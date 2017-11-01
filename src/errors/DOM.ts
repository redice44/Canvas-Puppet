export enum DOMErrorCodes {
  EMPTY_SELECTOR = 'ERR_DOM_SELECTOR_EMPTY',
  SELECTOR_NOT_FOUND = 'ERR_DOM_SELECTOR_404',
}

export class DOMError extends Error {
  public code: DOMErrorCodes;
  public selector: string;

  constructor(message: string, code: DOMErrorCodes, selector: string = '') {
    super(message);
    this.code = code;
    this.selector = selector;
  }
}
