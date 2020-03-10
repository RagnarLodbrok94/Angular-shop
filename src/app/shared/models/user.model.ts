export class User {
  constructor(
    public email: string,
    public password: string,
    public returnSecureToken?: boolean
  ) {}
}

export class FbAuthResponse {
  constructor(
    public idToken: string,
    public expiresIn: string
  ) {}
}