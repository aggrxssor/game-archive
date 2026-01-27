import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Games } from './pages/games/games';
import { Rules } from './pages/rules/rules';
import { Info } from './pages/info/info';
import { PageNotFound } from './pages/page-not-found/page-not-found';
import { Request } from './pages/request/request';
import { Scoreboard } from './pages/scoreboard/scoreboard';
import { Profiles } from './pages/profiles/profiles';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { WelcomePage } from './pages/welcome-page/welcome-page';

const routes: Routes = [
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "home", component: Home },
  { path: "request", component: Request },
  { path: "scoreboard", component: Scoreboard },
  { path: "profiles/:username", component: Profiles },
  { path: "games/:id", component: Games },
  { path: "404", component: PageNotFound },
  { path: "rules/:id", component: Rules },
  { path: "info", component: Info },
  { path: "welcome", component: WelcomePage },
  { path: "", redirectTo: "/welcome", pathMatch: "full" },
  { path: "**", redirectTo: "404", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'})],
      exports: [RouterModule]
    })
export class AppRoutingModule { }
