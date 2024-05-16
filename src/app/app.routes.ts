import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BaseGuard } from './services/base-guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [BaseGuard] },
    { path: 'account/login', component: LoginComponent },
    { path: 'account/signup', component: SignupComponent },
  ];
  