import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, take } from 'rxjs';
import { GestorService } from '../../services/gestor.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.scss'
})
export class AgregarComponent {

    pattern = '^[0-9]*$'

  addForm:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    precio: new FormControl(0, [Validators.required, Validators.pattern(this.pattern)]),
    stock: new FormControl(0, [Validators.required, Validators.pattern(this.pattern)]),
    description: new FormControl(''),
    image: new FormControl('')
  })

  constructor(private gestor:GestorService,private router:Router){

  }

  handleSubmit(){
    let productCreate = {
      nombre: this.addForm.get('nombre')?.value,
      precio: Number(this.addForm.get('precio')?.value),
      stock: Number(this.addForm.get('stock')?.value),
      description: this.addForm.get('description')?.value,
      image: this.addForm.get('image')?.value
    }
    console.log(productCreate)
    this.gestor.createProduct(productCreate).then(()=>{
      this.router.navigate(['/lista'])
    }).catch(err=>{
      console.log(err)
    })

  }
}
