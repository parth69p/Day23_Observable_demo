import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// step 1: created class intersceptor and added interface " HttpInterceptor"

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request:', req.url);

    return next.handle(req).pipe(
      tap(event => console.log('Response received')),
      // we are catchin an http error.
      catchError((error: HttpErrorResponse) => {
        console.error('Error occurred:', error.message);
        return throwError(() => error);
      })
    );
  }
}