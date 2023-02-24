import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonasComponent} from './listas/personas/personas.component';
import { RolesComponent } from './listas/roles/roles.component';

const routes: Routes = [
{path:'', redirectTo:'personas', pathMatch:'full'},
{path:'personas', component:PersonasComponent},
{path:'roles', component:RolesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [PersonasComponent, RolesComponent];