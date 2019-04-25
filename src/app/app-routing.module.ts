import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// mine
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AddClientComponent } from "./components/add-client/add-client.component";
import { EditClientComponent } from "./components/edit-client/edit-client.component";
import { ClientDetailsComponent } from "./components/client-details/client-details.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "client/add", component: AddClientComponent },
  { path: "client/edit/:id", component: EditClientComponent },
  { path: "client/:id", component: ClientDetailsComponent },
  { path: "settings", component: SettingsComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  // forRoot creates complete routing service with routes
  // forChild uses existing singular service w/ some added routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
