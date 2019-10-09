import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AboutComponent } from './component/about/about.component';
import { MessageBoxComponent } from './component/message-box/message-box.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"about",component:AboutComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"m/:id",component:MessageBoxComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
