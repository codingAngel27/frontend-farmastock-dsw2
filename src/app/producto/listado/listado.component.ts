import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/services/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';
import * as XLSX from 'xlsx'
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {
  productos: Producto[] = [];
  nomPro: String = "";
  pagedProductos: Producto[] = [];
  
  totalProductos: number = 0;
  pageSize: number = 5;
  currentPage: number = 0;


  constructor(private productoService: ProductoService,private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.listarProducto();
  }
  
  listarProducto() {
    this.productoService.listar().subscribe(data =>{
      this.productos = data;
      this.totalProductos = data.length;
      this.setPageData(0, this.pageSize);
    });
  }
  exportExcel(){
    let data = document.getElementById("table-producto");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'productos.xlsx');
  }
  setPageData(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.pagedProductos = this.productos.slice(start, end);
  }
  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPageData(this.currentPage, this.pageSize);
  }
  registrarProducto(){
    this.router.navigate(['producto/registrar'])
  }

  editarProducto(id: number){
    console.log(id);
    this.router.navigate(['producto/editar',id])
  }

  
  buscarProducto(name: String) {
    this.productoService.buscar(name).subscribe(data =>{
      this.productos = data;
      this.totalProductos= data.length
      this.setPageData(0, this.pageSize);
    });
  }
  //eliminarProducto(id: number) {
  //  this.productoService.eliminar(id).subscribe(data =>{
  //    this.listarProducto();
  //  });
  //}

  detalleProducto(id: number) {
    this.router.navigate(['producto/detalle',id])
  }

  regresar() {
    this.router.navigate(['inicio'])
  }
 
}