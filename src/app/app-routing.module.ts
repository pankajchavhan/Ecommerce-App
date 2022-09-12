import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { PageTitle } from './enums/page-title';
import { RoutePaths } from './enums/rout-path';

const routes: Routes = [
  {
    path:'',
    redirectTo:RoutePaths.PRODUCTS,
    pathMatch:'full'
  },
  {
    path:RoutePaths.PRODUCTS,
    component:ProductsComponent,
    data: { title: PageTitle.PRODUCTS_PAGE }
  },
  {
    path:RoutePaths.CART,
    component:CartComponent,
    data: { title: PageTitle.CART_PAGE }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
