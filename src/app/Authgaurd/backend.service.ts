import { Injectable } from '@angular/core';

import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../user.model';


const users: User[] = [{ id: 1, username: 'admin', password: 'admin', firstName: 'hi', lastName: 'hi' }];

@Injectable()
export class BackendService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const { url, method, headers, body } = request;

    
      return of(null)
          .pipe(mergeMap(handleRoute))
          .pipe(materialize()) 
          .pipe(delay(500))
          .pipe(dematerialize());

      function handleRoute() {
          switch (true) {
              case url.endsWith('/users/authenticate') && method === 'POST':
                  return authenticate();
              case url.endsWith('/users') && method === 'GET':
                  return getUsers();
              default:
                  
                  return next.handle(request);
          }    
      }



      function authenticate() {
          const { username, password } = body;
          const user = users.find(x => x.username === username && x.password === password);
          if (!user) return error('Username or password is incorrect');
          return ok(
              
          )
      }

      function getUsers() {
          if (!isLoggedIn()) return unauthorized();
          return ok(users);
      }

 

      function ok(body?: User[]) {
          return of(new HttpResponse({ status: 200, body }))
      }

      function error(message: string) {
          return throwError({ error: { message } });
      }

      function unauthorized() {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
      }

      function isLoggedIn() {
          return headers.get('Authorization') === 'Bearer fake-jwt-token';
      }
  }
}

export let fakeBackendProvider = {
 
  provide: HTTP_INTERCEPTORS,
  useClass: BackendService,
  multi: true
};