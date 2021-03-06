import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MdlModule } from '@angular-mdl/core';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  ApiService,
  FooterComponent,
  HeaderComponent,
  SharedModule,
  AuthService
} from './shared';

import {  AppStore,  appStoreProviders} from './app.store';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    rootRouting,
    SharedModule,
  ],
  providers: [
    ApiService,
    AuthService,
    appStoreProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
