import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './public/signup/signup.component';
import { LoginComponent } from './public/login/login.component';
import { UploadComponent } from './secure/upload/upload.component';
import { FilesComponent } from './pages/files/files.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'upload',
    component: UploadComponent,
    pathMatch: 'full'
  },
  {
    path: 'files',
    component: FilesComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: UploadComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
