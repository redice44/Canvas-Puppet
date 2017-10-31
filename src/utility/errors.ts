export class LoginError extends Error {
  public code: number;

  constructor(message: string, code: number = 0) {
    super(message);
    this.code = code;
  }
}