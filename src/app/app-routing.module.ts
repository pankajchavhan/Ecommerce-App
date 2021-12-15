import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { RxjsComponent } from './Components/rxjs/rxjs.component';

const routes: Routes = [
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'products',component:ProductsComponent},
  {path:'cart',component:CartComponent},
  {path:'rxjs', component:RxjsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
