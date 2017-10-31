interface Credentials {
  username: string,
  password: string
}

export interface LoginInfo {
  credentials: Credentials,
  url: string,
  selectors: {
    username: string,
    password: string,
    loginButton: string
  }
}
