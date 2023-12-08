import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {HttpClientModule} from "@angular/common/http";
import {WebService} from "./web.service";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './components/home/home.component';
import {AuthModule} from "@auth0/auth0-angular";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {WishlistComponent} from './components/wishlist/wishlist.component';
import { UploadComponent } from './components/upload/upload.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


var routes: any = [
  {
    path: '',
    component: HomeComponent
  },{
    path: 'upload',
    component: UploadComponent
  },
  // {
  //   path: 'account',
  //   component: AccountComponent
  // },{
  //   path: 'saved',
  //   component: SavedComponent
  // },
  // {
  //   path: 'posts/:id',
  //   component: PostByIdComponent
  // },{
  //   path: 'posts/users/:userID',
  //   component: PostByUserComponent
  // },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    WishlistComponent,
    UploadComponent,
    MyAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AuthModule.forRoot({
      domain: 'dev-m1vbm7mjkcjugfu4.uk.auth0.com',
      clientId: '6ewpgmsKYgAkHE7cJDXckJMjfKZs82Qv'
    })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
