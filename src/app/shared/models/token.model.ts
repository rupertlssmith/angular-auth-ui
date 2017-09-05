export class Token {
  sub: string;
  iss?: string;
  aud?: string;
  exp?: Date;
  iat?: Date;
  jti?: string;
  scopes: string[];
}
