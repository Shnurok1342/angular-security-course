import {AppComponent} from './app.component';
import {LessonsComponent} from './lessons/lessons.component';
import {routesConfig} from './routes.config';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {environment} from '../environments/environment';
import {AuthModule} from '@auth0/auth0-angular';

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
    AuthModule.forRoot({...environment.auth}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
