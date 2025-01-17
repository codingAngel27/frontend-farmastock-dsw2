import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { MatTableModule } from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { CrearComponent } from './proveedor/crear/crear.component';
import { ProveedorComponent } from './proveedor/lista/proveedor.component';
import { SolicitudCrearComponent } from './solicitud/crear/crear.component';
import { ProveedorDetalleComponent } from './proveedor/detalle/detalle.component';
import { SolicitudListaComponent } from './solicitud/lista/lista.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoComponent } from './producto/listado/listado.component';
import { RegistrarComponent } from './producto/registrar/registrar.component';
import { EditarComponent } from './producto/editar/editar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    PersonalDetailsComponent,
    RegisterComponent,
    CrearComponent,
    ProveedorComponent,
    SolicitudCrearComponent,
    ProveedorDetalleComponent,
    SolicitudListaComponent,
    ListadoComponent,
    RegistrarComponent,
    EditarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
