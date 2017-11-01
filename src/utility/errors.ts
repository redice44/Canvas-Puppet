export class LoginError extends Error {
  public code: number;

  constructor(message: string, code: number = 0) {
    super(message);
    this.code = code;
  }
}

export enum NavigationErrorCodes {
  FAILED = 0,
  TIMEOUT
}

export class NavigationError extends Error {
  public code: number;
  public url: string;

  constructor(message: string, url: string, code: number) {
    super(message);
    this.url = url;
    this.code = code;
  }
}
