import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Proveedor } from 'src/app/services/proveedor/proveedor';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  name: String = '';
  proveedores: Proveedor[] = [];
  pagedProveedores: Proveedor[] = [];
  totalProveedores: number = 0;

  pageSize: number = 5;
  currentPage: number = 0;

  // Define las columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'ruc', 'nomProvee', 'email', 'telefono', 'direccion', 'acciones'];

  constructor(private proveedorService: ProveedorService, private router: Router) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.proveedorService.listar().subscribe(data => {
      this.proveedores = data;
      this.totalProveedores = data.length;
      this.setPageData(0, this.pageSize); // Inicializa la primera página
    });
  }
  exportExcel(){
    let data = document.getElementById("table-proveedor");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'proveedores.xlsx');
  }
  importExcel(event:any){
    let file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      var workBook  = XLSX.read(fileReader.result,{type:'binary'});
      var sheetNames = workBook.SheetNames;
      const jsonData: any[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      console.log(jsonData);
    
    // Mapea los datos a tu modelo Proveedor
    const proveedores = jsonData.map(item => ({
      id: item.ID,
      ruc: item.RUC,
      nomProvee: item.Proveedor,
      email: item.Correo,
      telefono: item.Telefono,
      direccion: item.Dirección
    }));
  
      this.guardarProveedores(proveedores);
      console.log(this.proveedores);
    }

  }
  guardarProveedores(proveedores: Proveedor[]) {
    for (const proveedor of proveedores) {
        this.proveedorService.registrar(proveedor).subscribe({
            next: (response) => {
                console.log('Proveedor guardado:', response);
                // Aquí puedes actualizar tu lista de proveedores en caso de éxito
                this.listar(); // Cargar proveedores actualizados desde el servidor
            },
            error: (error) => {
                console.error('Error al guardar proveedor:', error);
            }
        });
    }
}
  setPageData(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.pagedProveedores = this.proveedores.slice(start, end);
  }

  onPaginateChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPageData(this.currentPage, this.pageSize);
  }

  irRegistrarProveedor() {
    this.router.navigate(['proveedor/crear']);
  }

  irEditarProveedor(id: number) {
    this.router.navigate(['/editar', id]);
  }

  buscarProveedor(name: String) {
    this.proveedorService.buscar(name).subscribe(data => {
      this.proveedores = data;
      this.totalProveedores = data.length;
      this.setPageData(0, this.pageSize);
    });
  }

  eliminar(id: number) {
    this.proveedorService.eliminar(id).subscribe(() => {
      this.listar();
    });
  }

  irDetalle(id: number) {
    this.router.navigate(['proveedor/detalle', id]);
  }

  irInicio() {
    this.router.navigate(['inicio']);
  }
}