import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerInfoComponent } from './beer-info/beer-info.component';

const routes: Routes = [
  { path: 'details/:id', component: BeerInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
