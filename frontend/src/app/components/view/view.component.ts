import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {

  producto:any

  constructor(private activatedRoute:ActivatedRoute){
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(data =>{
      this.producto = JSON.parse(atob(data['product']))
    })
  }
}
