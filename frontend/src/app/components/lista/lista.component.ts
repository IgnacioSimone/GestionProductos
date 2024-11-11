import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GestorService } from '../../services/gestor.service';
import { NgFor, NgIf } from '@angular/common';
import { EditarComponent } from '../editar/editar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NgFor, NgIf, EditarComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent implements OnInit {

  listaProductos:any
  editProduct:any
  edit:boolean = false
  modalDeleted:boolean = false
  productoAEliminar:any
  empty:boolean = false

  constructor(private gestor:GestorService, private router:Router){
  }

  ngOnInit(): void {
    this.listado()
  }

  listado(){
    this.gestor.getListadoProductos().then(response=>{
      this.listaProductos = response
      if(this.listaProductos.length === 0){
        this.empty = true
      } else {
        this.empty = false
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  editar(producto:any){
    this.router.navigate([`/editar/${producto.id}`], {queryParams: {product: btoa(JSON.stringify(producto)), edit:true}})
  }

  eliminar(product:any){
    this.productoAEliminar = product
    this.modalDeleted = true
  }
  closeModal(){
    this.modalDeleted = false
  }

  deleteProduct(){
    if(this.productoAEliminar){
      this.gestor.deleteProduct(this.productoAEliminar).then(()=>{
        this.modalDeleted = false
        this.listado()
      })
    } else {
      this.modalDeleted = false
    }
  }

  addProduct(){
    this.router.navigate(['/agregar'])
  }

  ver(producto:any){
    this.router.navigate([`/view/${producto.id}`], {queryParams: {product: btoa(JSON.stringify(producto))}})
  }
}
