import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ShopsComponent } from './shops/shops.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewshopFormComponent } from './newshop-form/newshop-form.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'review',
    component: ReviewFormComponent
  },
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'shops',
    component: ShopsComponent
  },
  {
    path: 'addshop',
    component: NewshopFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
