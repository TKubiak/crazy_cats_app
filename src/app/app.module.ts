import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CatService } from 'src/app/modules/cat-scroll/_service/cat.service';
import { CatScrollComponent } from 'src/app/modules/cat-scroll/cat-scroll-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';

@NgModule({
  declarations: [
    CatScrollComponent,
    AppComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
  ],
  providers: [CatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
