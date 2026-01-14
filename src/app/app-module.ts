import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Home } from './pages/home/home';
import { Games } from './pages/games/games';
import { Rules } from './pages/rules/rules';
import { Info } from './pages/info/info';
import { Request } from './pages/request/request';
import { Scoreboard } from './pages/scoreboard/scoreboard';
import { Profiles } from './pages/profiles/profiles';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { FormsModule } from '@angular/forms';
import { Tron } from './games/tron/tron';

@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    PageNotFound,
    Home,
    Games,
    Rules,
    Info,
    Request,
    Scoreboard,
    Profiles,
    Login,
    Register,
    Tron
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
