import {AppComponent} from './app.component';
import {LessonsComponent} from './lessons/lessons.component';
import {routesConfig} from './routes.config';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {environment} from '../environments/environment';
import {AuthModule} from '@auth0/auth0-angular';
import {AuthLoadResolver} from './resolvers/auth-load.resolver';
import {AuthHttpInterceptor} from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routesConfig),
    ReactiveFormsModule,
    AuthModule.forRoot(
      {
        ...environment.auth,
        httpInterceptor: {
          allowedList: [{
            uri: environment.apiRoot
          }]
        }
      },

    ),
  ],
  providers: [
    AuthLoadResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
