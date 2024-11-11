import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { GestorService } from '../../services/gestor.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.scss'
})
export class EditarComponent {
  editForm:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    precio: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    description: new FormControl(''),
    image: new FormControl('')
  })
  editProduct:any

  constructor(private activatedRoute:ActivatedRoute,private gestor:GestorService,private router:Router){
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(response =>{
      this.editProduct = JSON.parse(atob(response['product']))
      console.log(this.editProduct)
      this.editForm.get('nombre')?.patchValue(this.editProduct.nombre)
      this.editForm.get('precio')?.patchValue(this.editProduct.precio)
      this.editForm.get('stock')?.patchValue(this.editProduct.stock)
      this.editForm.get('image')?.patchValue(this.editProduct.image)
      this.editForm.get('description')?.patchValue(this.editProduct.description)
    })
  }

  handleSubmit(){
    let productUpdate = {
      id: this.editProduct.id,
      nombre: this.editForm.get('nombre')?.value,
      precio: Number(this.editForm.get('precio')?.value),
      stock: Number(this.editForm.get('stock')?.value),
      description: this.editForm.get('description')?.value,
      image: this.editForm.get('image')?.value
    }
    console.log(productUpdate)
    this.gestor.editProducto(productUpdate).then(()=>{
      this.router.navigate(['/lista'])
    }).catch(err=>{
      console.log(err)
    })

  }
}
