export enum NavigationErrorCodes {
  FAILED = 'ERR_NAV_FAILED',
  TIMEOUT = 'ERR_NAV_TIMEOUT',
  UNEXPECTED_DESTINATION = 'ERR_NAV_UNEXPECTED_DESTINATION'
}

export interface NavigationError extends Error {
  code: string,
  url: string
}
