import { Routes } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { EditarComponent } from './components/editar/editar.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewComponent } from './components/view/view.component';

export const routes: Routes = [
    {
        path:'lista',
        component:ListaComponent
    },
    {
        path:'editar/:id',
        component: EditarComponent
    },
    {
        path:'agregar',
        component: AgregarComponent
    },
    {
        path:'view/:id',
        component: ViewComponent
    },
    {
        path:'',
        redirectTo:'lista',
        pathMatch:'full'
    },
    {
        path:'**',
        component:NotFoundComponent
    }
];
