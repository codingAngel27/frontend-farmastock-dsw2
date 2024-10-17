import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Route, Router } from '@angular/router';
import { Solicitud } from 'src/app/services/solicitud/solicitud';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class SolicitudListaComponent {

  solicitudes: Solicitud[] =[];
  pagedSolicitudes: Solicitud[]=[];

  totalSolicitudes: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;


  constructor(private solicitudService: SolicitudService,private router: Router){}
 
  ngOnInit(){
    this.listar();
  }

  listar(){
    this.solicitudService.listar().subscribe(data =>{
      this.solicitudes= data;
      this.totalSolicitudes = data.length;
      this.setPageData(0, this.pageSize);
    });
  }
  
  setPageData(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.pagedSolicitudes = this.solicitudes.slice(start, end);
  }
  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPageData(this.currentPage, this.pageSize);
  }
  irRegistroSolicitud(){
    this.router.navigate(['solicitud/crear']);
  }
  
  irInicio(){
    this.router.navigate(['inicio'])
  }

}
