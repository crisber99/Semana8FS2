import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    RecuperaPassComponent,
    QuienesSomosComponent,
    InicioComponent,
    CatalogoComponent,
    PiePaginaComponent,
    RegistroComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
