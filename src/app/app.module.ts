import {AppComponent} from './app.component';
import {LessonsComponent} from './lessons/lessons.component';
import {routesConfig} from './routes.config';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LessonsService} from './services/lessons.service';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName:  'x-xsrf-token'
    }),
    RouterModule.forRoot(routesConfig),
    ReactiveFormsModule
  ],
  providers: [
    LessonsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
