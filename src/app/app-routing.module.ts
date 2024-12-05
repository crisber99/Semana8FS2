import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { RecuperaPassComponent } from './components/recupera-pass/recupera-pass.component'; 
import { RegistroComponent } from './components/registro/registro.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'menu', component:MenuComponent},
  {path:'catalogo', component:CatalogoComponent},
  {path:'inicio', component:InicioComponent},
  {path:'quienes-somos', component:QuienesSomosComponent},
  {path:'recuperar-pass', component:RecuperaPassComponent},
  {path:'registro', component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
