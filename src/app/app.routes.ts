import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch:"full"},
    {path: "home", component: HomeComponent},
    {path: "register", component : RegisterComponent },
    {path: "login", component : LoginComponent },
    {path: "profile", component : ProfileComponent },
    {path: "**", component:NotfoundComponent},
];
