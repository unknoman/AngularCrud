import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonasComponent } from './listas/personas/personas.component';
import { RolesComponent } from './listas/roles/roles.component';
import { PersonaComponent } from './listas/persona/persona.component';
import { HttpClientModule } from '@angular/common/http';
import { ModificarUsuarioComponent } from './modales/modificar-usuario/modificar-usuario.component';
import { DashboardComponent } from './utilidades/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PersonaComponent,
    ModificarUsuarioComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
