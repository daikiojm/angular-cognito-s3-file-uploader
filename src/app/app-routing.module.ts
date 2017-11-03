import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './public/signup/signup.component';
import { LoginComponent } from './public/login/login.component';
import { UploadComponent } from './secure/upload/upload.component';
import { FilesComponent } from './pages/files/files.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'files',
    component: FilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
