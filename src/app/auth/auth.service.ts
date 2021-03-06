import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  /*signup(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return _throw(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
      }
      return _throw(errorMessage);
    }));
  }*/

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('api/auth/signup',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    console.log('In Login Method');
    return this.http.post<AuthResponseData>
    ('api/auth/login',
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return _throw(errorMessage);
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
      }
      return _throw(errorMessage);
  }
}
