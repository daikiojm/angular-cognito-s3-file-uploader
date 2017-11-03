import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './public/signup/signup.component';
import { LoginComponent } from './public/login/login.component';
import { UploadComponent } from './secure/upload/upload.component';
import { CognitoService } from './service/cognito.service';
import { S3Service } from './service/s3.service';
import { FilesComponent } from './pages/files/files.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    UploadComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CognitoService,
    S3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
