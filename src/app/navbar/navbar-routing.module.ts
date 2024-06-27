import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../componentes/admin/admin.component';
import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
