import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './share/share.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { MessageService } from 'primeng/api';
import { SuccessComponent } from './success/success.component';
import { FacebookintegrationComponent } from './facebookintegration/facebookintegration.component';
import { ConfirmationService } from 'primeng/api';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookSignupComponent } from './facebook-signup/facebook-signup.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    FacebookintegrationComponent,
    FacebookLoginComponent,
    FacebookSignupComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,


  ],
  providers: [MessageService,ConfirmationService,{
    provide: HTTP_INTERCEPTORS, 
    useClass: InterceptorService, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
