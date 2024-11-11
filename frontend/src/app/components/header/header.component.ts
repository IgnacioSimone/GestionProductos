import { Location, NgClass, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  currentUrl:string =''
  buttonBack:boolean = false
  title:string = ''
  constructor(private location:Location,
    private cd:ChangeDetectorRef,
  private router:Router){}

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.currentUrl = event.urlAfterRedirects
        console.log(this.currentUrl.split('/')[1])
        if(this.currentUrl === '/lista'){
          this.buttonBack = false
        } else {
          this.buttonBack = true
        }
        switch (this.currentUrl.split('/')[1]) {
          case 'lista':
            this.title = 'Listado de Productos';
            break;
          case 'editar':
            this.title = 'Editar Producto';
            break;
          case 'agregar':
            this.title = 'Agregar Producto';
            break;
          case 'view':
            this.title = 'Vista Producto';
            break;
        }
        this.cd.detectChanges()
      }
    })
  }

  goBack(){
    this.location.back()
  }
}
