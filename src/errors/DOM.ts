export enum DOMErrorCodes {
  EMPTY_SELECTOR = 'ERR_DOM_SELECTOR_EMPTY',
  SELECTOR_NOT_FOUND = 'ERR_DOM_SELECTOR_404',
}

export interface DOMError extends Error {
  code: string,
  selector?: string
}
