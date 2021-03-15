import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthFacadeService} from '../services/auth-facade.service';
import {from, iif, Observable, of} from 'rxjs';
import {ApiRouteDefinition, AuthClientConfig, HttpInterceptorConfig, isHttpInterceptorRouteConfig} from '@auth0/auth0-angular';
import {concatMap, first, pluck, switchMap} from 'rxjs/operators';
import {GetTokenSilentlyOptions} from '@auth0/auth0-spa-js';

@Injectable({providedIn: 'root'})
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(
    private configFactory: AuthClientConfig,
    private authService: AuthFacadeService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const config = this.configFactory.get();
    if (!config.httpInterceptor?.allowedList) {
      return next.handle(req);
    }
    return this.findMatchingRoute(req, config.httpInterceptor).pipe(
      concatMap((route) =>
        iif(
          // Check if a route was matched
          () => route !== null,
          // If we have a matching route, call getTokenSilently and attach the token to the
          // outgoing request
          of(route).pipe(
            pluck('tokenOptions'),
            concatMap((options: GetTokenSilentlyOptions) =>
              this.authService.getAccessTokenSilently(options)
            ),
            switchMap((token: string | undefined) => {
              // If token was not found then pass request without attaching it
              if (!token) {
                return next.handle(req);
              } else {
                // Clone the request and attach the bearer token
                const clone = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${token}`),
                });

                return next.handle(clone);
              }
            })
          ),
          // If the URI being called was not found in our httpInterceptor config, simply
          // pass the request through without attaching a token
          next.handle(req)
        )
      )
    );
  }

  private stripQueryFrom(uri: string): string {
    if (uri.indexOf('?') > -1) {
      uri = uri.substr(0, uri.indexOf('?'));
    }

    if (uri.indexOf('#') > -1) {
      uri = uri.substr(0, uri.indexOf('#'));
    }

    return uri;
  }

  private canAttachToken(
    route: ApiRouteDefinition,
    request: HttpRequest<any>
  ): boolean {
    const testPrimitive = (value: string): boolean => {
      if (value) {
        value.trim();
      }

      if (!value) {
        return false;
      }

      const requestPath = this.stripQueryFrom(request.url);

      if (value === requestPath) {
        return true;
      }

      // If the URL ends with an asterisk, match using startsWith.
      return (
        value.indexOf('*') === value.length - 1 &&
        request.url.startsWith(value.substr(0, value.length - 1))
      );
    };

    if (isHttpInterceptorRouteConfig(route)) {
      if (route.httpMethod && route.httpMethod !== request.method) {
        return false;
      }

      return testPrimitive(route.uri);
    }

    return testPrimitive(route);
  }

  private findMatchingRoute(
    request: HttpRequest<any>,
    config: HttpInterceptorConfig
  ): Observable<ApiRouteDefinition | null> {
    return from(config.allowedList).pipe(
      first((route) => this.canAttachToken(route, request), null)
    );
  }
}
