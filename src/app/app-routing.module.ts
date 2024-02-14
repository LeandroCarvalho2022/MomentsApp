import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NewMomentsComponent } from './components/pages/new-moments/new-moments.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { CmsPageComponent } from './components/cms-page/cms-page.component';
import { AuthClassGuard } from './auth-class.guard';
import { ContatoComponent } from './components/pages/contato/contato.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sobre', component: AboutComponent},
  {path: 'ctt', component: ContatoComponent},
  {
  path: 'newmoments', 
  component: NewMomentsComponent, 
  canActivate : [authGuard],
  //canActivate: [AuthClassGuard]
  },

  {
  path: 'moments/edit/:id',
  component: EditMomentComponent,
  canActivate : [authGuard]
  //canActivate: [AuthClassGuard]
  },

  {path: 'moment/:id', component: MomentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cms', component: CmsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
