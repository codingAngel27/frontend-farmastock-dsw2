import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ProveedorComponent } from './proveedor/lista/proveedor.component';
import { CrearComponent } from './proveedor/crear/crear.component';
import { SolicitudCrearComponent } from './solicitud/crear/crear.component';
import { ProveedorDetalleComponent } from './proveedor/detalle/detalle.component';
import { SolicitudListaComponent } from './solicitud/lista/lista.component';
import { ListadoComponent } from './producto/listado/listado.component';
import { RegistrarComponent } from './producto/registrar/registrar.component';
import { EditarComponent } from './producto/editar/editar.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'/iniciar-sesion', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent, canActivate: [authGuard]},
  {path:'iniciar-sesion',component:LoginComponent},
  {path:'iniciar-sesion/register',component:RegisterComponent},
  {path:'proveedor/lista',component:ProveedorComponent, canActivate: [authGuard]},
  {path:'proveedor/crear',component:CrearComponent,canActivate: [authGuard]},
  {path:'editar/:id',component:CrearComponent,canActivate: [authGuard]},
  {path:'solicitud/crear',component:SolicitudCrearComponent, canActivate: [authGuard]},
  {path:'solicitud/lista',component:SolicitudListaComponent, canActivate: [authGuard]},
  {path:'proveedor/detalle/:id',component:ProveedorDetalleComponent, canActivate: [authGuard]},
  {path:'producto/listar', component:ListadoComponent, canActivate: [authGuard]},
  {path:'producto/registrar', component:RegistrarComponent, canActivate: [authGuard]},
  {path:'producto/editar/:id', component:EditarComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
