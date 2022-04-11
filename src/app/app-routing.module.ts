import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedInGuard } from './modules/auth/guards/user-logged-in-guard.service';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { ROUTING_PARAMS } from './consts/routing-params';
import { CatScrollComponent } from './modules/cat-scroll/cat-scroll-list.component';

const routes: Routes = [
  {
    path: ROUTING_PARAMS.DASHBOARD.path,
    canActivate: [UserLoggedInGuard],
    component: CatScrollComponent,
  },
  {
    path: ROUTING_PARAMS.SIGN_IN.path,
    component: SignInComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
