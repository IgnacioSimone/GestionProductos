import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestorService {
apiUrl = 'http://localhost:8080/api/productos'
  constructor(private http:HttpClient) { }

  getListadoProductos():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.http.get(this.apiUrl).pipe(take(1)).subscribe(response =>{
        resolve(response)
      }, error=>{
        console.log(error)
        reject(error)
      })
    })
  }

  editProducto(producto:any):Promise<any>{
    return new Promise((resolve, reject)=>{
      this.http.put(this.apiUrl + '/' + producto.id, producto).pipe(take(1)).subscribe(response=>{
        resolve(response)
      }, err=>{
          reject(err)
      })
    })
  }

  createProduct(producto:any){
    return new Promise((resolve, reject)=>{
      this.http.post(this.apiUrl, producto).pipe(take(1)).subscribe(response=>{
        resolve(response)
      }, err=>{
          reject(err)
      })
    })
  }

  deleteProduct(producto:any):Promise<any>{
    return new Promise((resolve, reject)=>{
      this.http.delete(this.apiUrl + '/' + producto.id, producto).pipe(take(1)).subscribe(response=>{
        resolve(response)
      }, err=>{
          reject(err)
      })
    })
  }
  
}
