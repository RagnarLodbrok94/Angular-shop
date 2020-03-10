import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, FbAuthResponse } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable()

export class AuthService {
  responseForUser: string;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  get token(): string {
    const expDate = new Date( localStorage.getItem( 'fb-token-exp' ) );
    if( new Date() > expDate ) {
      this.logout();
      return null;
    }
    return localStorage.getItem( 'fb-token' );
  }

  register( user: User ): Observable<any> {
    return this.http.post( `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${ environment.apiKey }`, user )
      .pipe(
        catchError( this.handleError.bind( this ) ),
        finalize( () => this.messageForUser( 'Your account has been created successfully' ) )
      )    
  }

  login( user: User ): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post( `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ environment.apiKey }`, user )
      .pipe(
        tap( this.setToken ),
        catchError( this.handleError.bind( this ) ),
        finalize( () => this.messageForUser( 'Welcome to your account' ) )
      )
  }

  logout() {
    this.setToken( null )
  }

  isAuthenticated() {
    return !!this.token;
  }

  private handleError( error: HttpErrorResponse ) {
    const { message } = error.error.error;
    switch( message ) {
      case 'INVALID_EMAIL':
        this.responseForUser = 'Invalid email';
        break
      case 'INVALID_PASSWORD':
        this.responseForUser = 'Invalid password';
        break
      case 'EMAIL_NOT_FOUND':
        this.responseForUser = 'Email not found';
        break
      case 'EMAIL_EXISTS':
        this.responseForUser = 'Email exists';
        break
    }
    return throwError( error );
  }

  private messageForUser( message: string ) {
    let
      snackBarTheme: string[],
      snackBarMessage: string,
      snackBarDuration: number;

    if( this.responseForUser ) {
      snackBarTheme = [ 'mat-toolbar', 'mat-warn' ];
      snackBarMessage = this.responseForUser;
      snackBarDuration = null;
    } else {
      snackBarTheme = [ 'mat-toolbar', 'mat-primary' ];
      snackBarMessage = message;
      snackBarDuration = 2000;
    }

    this.snackBar.open( snackBarMessage, null, {
      duration: snackBarDuration,
      panelClass: snackBarTheme
    } );

    this.responseForUser = null;
  }

  private setToken( response: FbAuthResponse | null ) {
    if( response ) {
      const expDate = new Date( new Date().getTime() + +response.expiresIn * 1000 );
      localStorage.setItem( 'fb-token', response.idToken );
      localStorage.setItem( 'fb-token-exp', expDate.toString() );
    } else { 
      localStorage.clear();
    }
  }
}